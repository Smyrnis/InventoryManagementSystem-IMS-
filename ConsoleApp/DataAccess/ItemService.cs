using InventoryManagmentSystem.Models;
using System.Text.Json;

namespace InventoryManagmentSystem.DataAccess
{
    public class ItemRepository
    {
        private List<Item> _items = new();
        private readonly string _filePath = "inventory.json";

        public ItemRepository()
        {
            LoadFromFile();
        }

        public List<Item> GetAll()
        {
            return _items;
        }

        public void Add(Item item)
        {
            item.Id = _items.Count > 0 ? _items.Max(i => i.Id) + 1 : 1;
            _items.Add(item);
            SaveToFile();
        }

        public void Update(Item item)
        {
            var index = _items.FindIndex(i => i.Id == item.Id);
            if (index != -1)
            {
                _items[index] = item;
                SaveToFile();
            }
        }

        public void Delete(int id)
        {
            _items.RemoveAll(i => i.Id == id);
            SaveToFile();
        }

        private void SaveToFile()
        {
            var json = JsonSerializer.Serialize(_items, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        private void LoadFromFile()
        {
            if (File.Exists(_filePath))
            {
                var json = File.ReadAllText(_filePath);
                _items = JsonSerializer.Deserialize<List<Item>>(json) ?? new List<Item>();
            }
        }
    }
}

