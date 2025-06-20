using System.ComponentModel;
using InventoryManagmentSystem.Models;
using InventoryManagmentSystem.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

class Program
{
    static void Main()
    {
        var optionsBuilder = new DbContextOptionsBuilder<InventoryContext>();
        optionsBuilder.UseSqlite("Data Source=inventory.db");
        using var db = new InventoryContext(optionsBuilder.Options);
        db.Database.EnsureCreated();

        // Alert for low stock items
        ShowLowStockAlert(db);

        while (true)
        {
            Console.Clear();
            Console.WriteLine("================= Inventory Management System =================");
            Console.WriteLine("1. List All Items");
            Console.WriteLine("2. Add Item");
            Console.WriteLine("3. Edit Item");
            Console.WriteLine("4. Delete Item");
            Console.WriteLine("5. Search Items");
            Console.WriteLine("6. Exit");
            Console.Write("Select an option: ");
            var choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    ListItems(db);
                    break;
                case "2":
                    AddItem(db);
                    break;
                case "3":
                    EditItem(db);
                    break;
                case "4":
                    DeleteItem(db);
                    break;
                case "5":
                    SearchItems(db);
                    break;
                case "6":
                    return;
                default:
                    Console.WriteLine("Invalid choice. Please try again.");
                    Console.ReadLine();
                    break;
            }
        }
    }

    static int ReadInt(string prompt)
    {
        int value;
        while (true)
        {
            Console.Write(prompt);
            var input = Console.ReadLine();
            if (int.TryParse(input, out value))
                return value;

            Console.WriteLine("Invalid number. Try again.");
        }
    }

    static void ShowLowStockAlert(InventoryContext db)
    {
        var lowStockItems = db.Items.Where(i => i.Quantity < 5).ToList();

        if (lowStockItems.Count > 0)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("\n <> Low Stock Alert! <> : ");

            Console.ResetColor();
            Console.WriteLine("{0,-5} {1,-20} {2,-10} {3,-8}",
                "ID", "Name", "Category", "Quantity");

            foreach (var item in lowStockItems)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("{0,-5} {1,-20} {2,-10} {3,-8}",
                    item.Id, item.Name, item.Category, item.Quantity);
            }

            Console.ResetColor();
            Console.WriteLine();
        }
    }

    static void ListItems(InventoryContext db)
    {
        var items = db.Items.ToList();
        Console.WriteLine("\n--- Inventory Items ---");

        if (items.Count == 0)
        {
            Console.WriteLine("No items in inventory.");
        }
        else
        {
            Console.WriteLine("{0,-5} {1,-20} {2,-10} {3,-8} {4}", "ID", "Name", "Category", "Quantity", "Description");

            foreach (var item in items)
            {
                if (item.Quantity < 5)
                    Console.ForegroundColor = ConsoleColor.Red;
                else
                    Console.ResetColor();

                Console.WriteLine("{0,-5} {1,-20} {2,-10} {3,-8} {4}",
                    item.Id, item.Name, item.Category, item.Quantity, item.Description ?? "N/A");
            }

            Console.ResetColor();
        }

        Console.WriteLine("\nPress Enter to return to menu.");
        Console.ReadLine();
    }

    static void SearchItems(InventoryContext db)
    {
        Console.WriteLine("\n--- Search Items ---");
        Console.WriteLine("1. Search by Name");
        Console.WriteLine("2. Filter by Category");
        Console.Write("Choose an option: ");
        var option = Console.ReadLine();

        var items = db.Items.ToList();
        List<Item> result = new();

        if (option == "1")
        {
            Console.Write("Enter name to search: ");
            var keyword = Console.ReadLine()?.ToLower() ?? "";
            result = items.Where(i => i.Name.ToLower().Contains(keyword)).ToList();
        }
        else if (option == "2")
        {
            Console.Write("Enter category to filter: ");
            var category = Console.ReadLine()?.ToLower() ?? "";
            result = items.Where(i => i.Category.ToLower() == category).ToList();
        }
        else
        {
            Console.WriteLine("Invalid option. Press Enter to return to menu.");
            Console.ReadLine();
            return;
        }

        if (result.Count == 0)
        {
            Console.WriteLine("No matching items found.");
        }
        else
        {
            Console.WriteLine("\nID     Name            Category    Quantity Description");
            foreach (var item in result)
            {
                if (item.Quantity < 5)
                    Console.ForegroundColor = ConsoleColor.Red;
                else
                    Console.ResetColor();

                Console.WriteLine("{0,-5} {1,-20} {2,-10} {3,-8} {4}",
                    item.Id, item.Name, item.Category, item.Quantity, item.Description ?? "N/A");
            }

            Console.ResetColor();
        }

        Console.WriteLine("\nPress Enter to return to menu.");
        Console.ReadLine();
    }

    static void AddItem(InventoryContext db)
    {
        Console.WriteLine("\n--- Add New Item ---");

        Console.Write("Name: ");
        var name = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(name))
        {
            Console.WriteLine("Name is required. Press Enter to return to menu.");
            Console.ReadLine();
            return;
        }

        Console.Write("Category: ");
        var category = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(category))
        {
            Console.WriteLine("Category is required. Press Enter to return to menu.");
            Console.ReadLine();
            return;
        }

        var quantity = ReadInt("Quantity: ");

        Console.Write("Description: ");
        var description = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(description))
        {
            description = "------";
        }

        var newItem = new Item
        {
            Name = name,
            Category = category,
            Quantity = quantity,
            Description = description
        };

        db.Items.Add(newItem);
        db.SaveChanges();

        Console.WriteLine("Item added. Press Enter to return to menu.");
        Console.ReadLine();
    }

    static void EditItem(InventoryContext db)
    {
        Console.WriteLine("\n--- Edit Item ---");
        var id = ReadInt("Enter Item ID to edit: ");

        var item = db.Items.FirstOrDefault(i => i.Id == id);
        if (item == null)
        {
            Console.WriteLine("Item not found. Press Enter to return to menu.");
            Console.ReadLine();
            return;
        }

        Console.Write($"New Name (leave blank to keep '{item.Name}'): ");
        var name = Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(name)) item.Name = name;

        Console.Write($"New Category (leave blank to keep '{item.Category}'): ");
        var category = Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(category)) item.Category = category;

        Console.Write($"New Quantity (leave blank to keep '{item.Quantity}'): ");
        var quantityInput = Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(quantityInput) && int.TryParse(quantityInput, out int newQty))
            item.Quantity = newQty;

        Console.Write($"New Description (leave blank to keep current): ");
        var description = Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(description)) item.Description = description;

        db.SaveChanges();
        Console.WriteLine("Item updated. Press Enter to return to menu.");
        Console.ReadLine();
    }

    static void DeleteItem(InventoryContext db)
    {
        Console.WriteLine("\n--- Delete Item ---");
        var id = ReadInt("Enter ID of the item to delete: ");

        var item = db.Items.FirstOrDefault(i => i.Id == id);
        if (item == null)
        {
            Console.WriteLine("Item not found. Press Enter to return to menu.");
            Console.ReadLine();
            return;
        }

        db.Items.Remove(item);
        db.SaveChanges();

        Console.WriteLine("Item deleted. Press Enter to return to menu.");
        Console.ReadLine();
    }
}
