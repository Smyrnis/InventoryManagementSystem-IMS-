using InventoryManagmentSystem.Data;
using InventoryManagmentSystem.Models;

public class InventoryService
{
    private readonly InventoryContext _db;

    public InventoryService(InventoryContext db)
    {
        _db = db;
    }
// Retrieves all items from the database
    // Returns a list of Item objects
    // If no items exist, returns an empty list
    // If an error occurs, it will throw an exception
    // Example usage: var items = inventoryService.GetAll();
    public List<Item> GetAll() => _db.Items.ToList();

    public Item? GetById(int id) => _db.Items.FirstOrDefault(i => i.Id == id);

    public void AddItem(Item item)
    {
        _db.Items.Add(item);
        _db.SaveChanges();
    }
// Updates an existing item in the database
    // If the item does not exist, it will not perform any action
    // Example usage: inventoryService.UpdateItem(updatedItem);
    // Note: Ensure the updated item has a valid Id that exists in the database
     
    public void UpdateItem(Item updated)
    {
        var item = _db.Items.Find(updated.Id);
        if (item == null) return;

        item.Name = updated.Name;
        item.Category = updated.Category;
        item.Quantity = updated.Quantity;
        item.Description = updated.Description;
        _db.SaveChanges();
    }
// Deletes an item from the database by its ID
    // If the item does not exist, it will not perform any action
    // Example usage: inventoryService.DeleteItem(itemId);
    // Note: Ensure the item ID is valid and exists in the database
    public void DeleteItem(int id)
    {
        var item = _db.Items.Find(id);
        if (item != null)
        {
            _db.Items.Remove(item);
            _db.SaveChanges();
        }
    }
}
