using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryManagmentSystem.Models;
using InventoryManagmentSystem.Data; // your DbContext namespace

namespace InventoryManagmentSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly InventoryContext _context;

        public ItemsController(InventoryContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            item.CreatedAt = DateTime.UtcNow; // Ensure CreatedAt is set to current time

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var item = await _context.Items
            .OrderByDescending(i => i.CreatedAt)
            .ToListAsync();
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return NotFound();

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] Item updatedItem)
        {
            if (id != updatedItem.Id)
                return BadRequest("Item ID mismatch.");

            var existingItem = await _context.Items.FindAsync(id);
            if (existingItem == null)
                return NotFound();

            // Update fields
            existingItem.Name = updatedItem.Name;
            existingItem.Category = updatedItem.Category;
            existingItem.Quantity = updatedItem.Quantity;
            existingItem.Description = updatedItem.Description;
            // optionally update CreatedAt or other fields as needed

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Items.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchItems([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Search query cannot be empty.");

            var items = await _context.Items
                .Where(i => i.Name.Contains(query) || i.Description.Contains(query))
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetReportsSummary()
        {
            var totalItems = await _context.Items.CountAsync();
            var lowStockItems = await _context.Items.CountAsync(i => i.Quantity < 5);
            var pendingDeliveries = await _context.Deliveries.CountAsync(d => d.Status == "Pending");

            var summary = new
            {
                totalItems,
                lowStockItems,
                pendingDeliveries
            };

            return Ok(summary);
        }

    }
}

      
