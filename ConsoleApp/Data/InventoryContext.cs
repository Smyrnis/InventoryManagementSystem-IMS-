using Microsoft.EntityFrameworkCore;
using InventoryManagmentSystem.Models;
using Microsoft.EntityFrameworkCore.Design;

namespace InventoryManagmentSystem.Data
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<User> Users { get; set; }
    }

    public class InventoryContextFactory : IDesignTimeDbContextFactory<InventoryContext>
    {
        public InventoryContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<InventoryContext>();
            optionsBuilder.UseSqlite("Data Source=/mnt/HDD/N-1/InventoryManagement/ConsoleApp/inventory.db");

            return new InventoryContext(optionsBuilder.Options);
        }
    }

}

