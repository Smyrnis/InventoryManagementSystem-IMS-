namespace InventoryManagmentSystem.Models
{
    public class Item
    {
        public int Id { get; set; } // EF Core will automatically set this as the 
                                    // primary key and identity column
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string? Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Delivery
    {
        public int Id { get; set; } // EF Core will automatically set this as the 
                                    // primary key and identity column
        public string ItemName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string Type { get; set; } = "incoming"; // "incoming" or "outgoing"

        public string Status { get; set; } = "Pending"; // "Pending" or "Delivered"

        public DateTime Date { get; set; } = DateTime.UtcNow;
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }



        public User() // parameterless constructor required by EF Core
        {
            Username = string.Empty;
            Email = string.Empty;
            PasswordHash = Array.Empty<byte>();
            PasswordSalt = Array.Empty<byte>();
        }
    }
}

// Note: The above code is a simplified version of the models used in the Inventory Management System.
// Ensure that you have the necessary using directives for namespaces like System, System.Collections.Generic,
// System.ComponentModel.DataAnnotations, and System.ComponentModel.DataAnnotations.Schema if needed.
// You may also need to adjust the namespaces based on your project structure.
// The Item, Delivery, and User classes represent the core entities in the system.
// They can be extended with additional properties or methods as needed for your application.