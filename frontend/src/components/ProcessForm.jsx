import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function InventoryDashboard() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    const newItem = { name, category, quantity, description };

    try {
      await axios.post("http://localhost:5000/api/items", newItem);
      setMessage("Item added successfully!");
      setName("");
      setCategory("");
      setQuantity(0);
      setDescription("");
      setShowForm(false);
      fetchItems();
    } catch (err) {
      setError("Failed to add item. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      {/* Sidebar */}
      {sidebarVisible && (
        <nav className="bg-white border-end shadow-sm" style={{ width: 250, padding: "1.5rem" }}>
                  <h4 className="mb-4 fw-bold text-secondary">Inventory</h4>
                  <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                      <Link
                        to="/"
                        className="nav-link fw-semibold fs-5 px-3 py-2 rounded bg-primary text-light"
                        aria-current="page"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item mb-3">
                      <Link
                        to="/items"
                        className="nav-link fw-semibold fs-5 px-3 py-2 rounded"
                        style={{ color: "#131D4F", transition: "background-color 0.3s" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#DDDDDD";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                      >
                        Items
                      </Link>
                    </li>
                    <li className="nav-item mb-3">
                      <Link
                        to="/reports"
                        className="nav-link fw-semibold fs-5 px-3 py-2 rounded"
                        style={{ color: "#131D4F", transition: "background-color 0.3s" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#DDDDDD";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                      >
                        Reports
                      </Link>
                    </li>
                    <li className="nav-item mb-3">
                      <Link
                        to="/deliveries"
                        className="nav-link fw-semibold fs-5 px-3 py-2 rounded"
                        style={{ color: "#131D4F", transition: "background-color 0.3s" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#DDDDDD";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                      >
                        Deliveries
                      </Link>
                    </li>
                    <li className="nav-item mb-3">
                      <Link
                        to="/settings"
                        className="nav-link fw-semibold fs-5 px-3 py-2 rounded"
                        style={{ color: "#131D4F", transition: "background-color 0.3s" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#DDDDDD";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#131D4F";
                        }}
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
      )}

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="d-flex align-items-center justify-content-between bg-white border-bottom px-4 py-2 shadow-sm">
          <button
            className="btn btn-outline-primary"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            aria-label={sidebarVisible ? "Hide menu" : "Show menu"}
          >
            {sidebarVisible ? "<" : ">"}
          </button>
          <h1 className="h4 m-0 text-primary fw-bold">Dashboard</h1>
          <div></div>
        </header>

        {/* Content */}
        <main className="p-4 flex-grow-1 overflow-auto">
          <button
            className={`btn ${showForm ? "btn-danger" : "btn-primary"} mb-3 shadow-sm`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Item +"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mb-4 border rounded shadow-sm p-4 bg-white"
            >
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  value={quantity}
                  required
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-success shadow-sm"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </form>
          )}

          {message && (
            <div className="alert alert-success shadow-sm" role="alert">
              {message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger shadow-sm" role="alert">
              {error}
            </div>
          )}

          <h2 className="mb-3 text-secondary fw-semibold">All Items</h2>
          <div className="table-responsive shadow-sm rounded bg-white">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th scope="col">Added At</th>
                </tr>
              </thead>
              <tbody>
                {[...items]
                  .sort((a, b) => b.id - a.id)
                  .map((item) => (
                    <tr key={item.id} style={{ cursor: "default" }}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
