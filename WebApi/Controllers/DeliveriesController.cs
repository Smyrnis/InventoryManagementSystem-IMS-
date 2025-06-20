using InventoryManagmentSystem.Data;
using InventoryManagmentSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagmentSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveriesController : ControllerBase
    {
        private readonly InventoryContext _context;

        public DeliveriesController(InventoryContext context)
        {
            _context = context;
        }

        // GET: api/deliveries
        [HttpGet]
        public async Task<IActionResult> GetDeliveries()
        {
            var deliveries = await _context.Deliveries.ToListAsync();
            return Ok(deliveries);
        }

        // POST: api/deliveries
        [HttpPost]
        public async Task<IActionResult> CreateDelivery([FromBody] Delivery delivery)
        {
            if (delivery == null)
                return BadRequest("Invalid delivery data.");

            delivery.Status = "Pending";
            delivery.Date = DateTime.UtcNow;

            _context.Deliveries.Add(delivery);
            await _context.SaveChangesAsync();

            return Ok(delivery);
        }

        // PUT: api/deliveries/{id}/fulfill
        [HttpPut("{id}/fulfill")]
        public async Task<IActionResult> FulfillDelivery(int id)
        {
            var delivery = await _context.Deliveries.FindAsync(id);
            if (delivery == null) return NotFound();

            if (delivery.Status == "Delivered")
                return BadRequest("Delivery already fulfilled.");

            // Fulfill logic
            delivery.Status = "Delivered";

            // Find existing item
            var item = await _context.Items.FirstOrDefaultAsync(i => i.Name == delivery.ItemName);

            if (delivery.Type == "incoming")
            {
                if (item != null)
                {
                    item.Quantity += delivery.Quantity;
                }
                else
                {
                    _context.Items.Add(new Item
                    {
                        Name = delivery.ItemName,
                        Quantity = delivery.Quantity,
                        Category = "Uncategorized"
                    });
                }
            }
            else if (delivery.Type == "outgoing")
            {
                if (item == null || item.Quantity < delivery.Quantity)
                    return BadRequest("Not enough stock for this delivery.");

                item.Quantity -= delivery.Quantity;
            }

            await _context.SaveChangesAsync();
            return Ok(delivery);
        }
    }
}

// Note: Ensure that the InventoryContext and Delivery model are properly defined in your project.
// The InventoryContext should include DbSet<Delivery> Deliveries and DbSet<Item> Items.
// The Delivery model should have properties like Id, ItemName, Quantity, Type, Status, and
