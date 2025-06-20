import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

// Main Component
export default function Deliveries() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = () => {
  axios.get('http://localhost:5000/api/deliveries')
    .then(res => {
      const allDeliveries = res.data;
      setIncoming(allDeliveries.filter(d => d.type === 'incoming'));
      setOutgoing(allDeliveries.filter(d => d.type === 'outgoing'));
    })
    .catch(console.error);
};


  const markAsDelivered = (id) => {
  axios.put(`http://localhost:5000/api/deliveries/${id}/fulfill`)
    .then(() => fetchDeliveries());
};


  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {sidebarVisible && <Sidebar />}

      <div className="flex-grow-1 d-flex flex-column">
        <header className="d-flex align-items-center justify-content-between bg-white border-bottom px-4 py-2 shadow-sm">
          <button className="btn btn-outline-primary" onClick={() => setSidebarVisible(!sidebarVisible)}>
            {sidebarVisible ? "<" : ">"}
          </button>
          <h1 className="h4 m-0 text-primary fw-bold">Deliveries</h1>
          <div></div>
        </header>

        <main className="p-4 flex-grow-1 overflow-auto">
          <section className="mb-5">
            <h2 className="mb-3">Incoming Deliveries</h2>
            <DeliveryForm type="incoming" onCreated={fetchDeliveries} />
            <DeliveryTable data={incoming} type="incoming" onFulfill={markAsDelivered} />
          </section>

          <section>
            <h2 className="mb-3">Outgoing Deliveries</h2>
            <DeliveryForm type="outgoing" onCreated={fetchDeliveries} />
            <DeliveryTable data={outgoing} type="outgoing" onFulfill={markAsDelivered} />
          </section>
        </main>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  return (
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
            className="nav-link fw-semibold fs-5 px-3 py-2 rounded bg-primary text-light"
            aria-current="page"
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
  );
}

// Delivery Form Component
function DeliveryForm({ type, onCreated }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios.post('http://localhost:5062/api/deliveries', { ...data, type })
  .then(() => {
    onCreated();
    reset();
  })
  .catch(err => console.error("Delivery submission failed", err));

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 p-3 border rounded bg-white shadow-sm">
      <div className="row g-2 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Item Name</label>
          <input {...register("itemName")} className="form-control" required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Quantity</label>
          <input type="number" {...register("quantity")} className="form-control" required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Status</label>
          <select {...register("status")} className="form-select">
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            {...register("date")}
            className="form-control"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}

// Delivery Table Component
function DeliveryTable({ data, type, onFulfill }) {
  if (!data.length) return <p>No {type} deliveries yet.</p>;

  return (
    <table className="table table-bordered bg-white shadow-sm">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.itemName}</td>
            <td>{d.quantity}</td>
            <td>{d.status}</td>
            <td>{new Date(d.date).toLocaleDateString()}</td>
            <td>
              {d.status === "Pending" && (
                <button className="btn btn-sm btn-success" onClick={() => onFulfill(d.id)}>
                  Mark as Delivered
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
