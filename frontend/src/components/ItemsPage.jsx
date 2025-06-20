import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Edit mode states
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    quantity: 0,
    description: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  // Delete item status
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const confirmDelete = (item) => {
  setItemToDelete(item);
  setShowDeleteConfirm(true);
};

const performDelete = async () => {
  if (!itemToDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/items/${itemToDelete.id}`);
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    fetchItems();
  } catch (err) {
    console.error("Error deleting item", err);
  }
};


  const startEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      description: item.description || "",
    });
    setEditError(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditError(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      await axios.put(`http://localhost:5000/api/items/${editingItem.id}`, editForm);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      setEditError("Failed to update item.");
      console.error(err);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Sidebar */}
      {sidebarVisible && (
        <nav className="bg-white border-end shadow-sm" style={{ width: 250, padding: "1.5rem" }}>
                          <h4 className="mb-4 fw-bold text-secondary">Inventory</h4>
                          <ul className="nav flex-column">
                            <li className="nav-item mb-3">
                              <Link
                                to="/"
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
                                Dashboard
                              </Link>
                            </li>
                            <li className="nav-item mb-3">
                              <Link
                                to="/items"
                                className="nav-link fw-semibold fs-5 px-3 py-2 rounded bg-primary text-light"
                                style={{ color: "#131D4F", transition: "background-color 0.3s" }}
                                aria-current="page"
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

      {/* Main content + toggle button */}
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
          <h1 className="h4 m-0 text-primary fw-bold">Items</h1>
          <div></div>
        </header>

        <main className="p-4 flex-grow-1 overflow-auto">
          {/* Edit form */}
          {editingItem && (
            <div className="mb-4 p-4 border rounded shadow-sm bg-white">
              <h4 className="mb-3 text-secondary">Edit Item</h4>
              <form onSubmit={submitEdit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    min="0"
                    onChange={handleEditChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="form-control"
                    rows={3}
                  />
                </div>
                {editError && <p className="text-danger mb-3">{editError}</p>}
                <div>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="btn btn-primary me-3 shadow-sm"
                  >
                    {editLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger shadow-sm"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Items Table */}
          <h2 className="mb-4 fw-bold text-primary">Items List</h2>
          <div className="table-responsive shadow-sm rounded bg-white">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th style={{ width: 70 }}>Qty</th>
                  <th>Description</th>
                  <th style={{ width: 160 }}>Date Added</th>
                  <th style={{ width: 150 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No items found.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} style={{ cursor: "default" }}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => startEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => confirmDelete(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
            <div
                className="modal show fade d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <div className="modal-dialog">
                <div className="modal-content shadow-lg">
                    <div className="modal-header">
                    <h5 className="modal-title text-danger">Confirm Deletion</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowDeleteConfirm(false)}
                    ></button>
                    </div>
                    <div className="modal-body">
                    <p>
                        Are you sure you want to delete{" "}
                        <strong>{itemToDelete?.name}</strong>?
                    </p>
                    </div>
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={performDelete}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                </div>
            </div>
            )}
      </div>
    </div>
  );
}
