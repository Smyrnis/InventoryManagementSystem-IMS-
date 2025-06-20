import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import{
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Reports() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [reportData, setReportData] = useState({
    totalItems: 0,
    lowStockItems: 0,
    pendingDeliveries: 0,
  })

  const chartData = [
    { name: "Total Items", value: reportData.totalItems },
    { name: "Low Stock", value: reportData.lowStockItems },
    { name: "Pending Deliveries", value: reportData.pendingDeliveries },
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#F44336"];

  useEffect(()=> {
    axios.get('http://localhost:5000/api/items/summary')
      .then(response => {
        setReportData(response.data);
      })
      .catch(error => {
        console.error("Error fetching report data:", error);
      }
    );
  },[]);

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
                className="nav-link fw-semibold fs-5 px-3 py-2 rounded bg-primary text-light"
                aria-current="page"
              >
                Reports
              </Link>
            </li>
            <li className="nav-item mb-3">
              <a
                href="/deliveries"
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
              </a>
            </li>
            <li className="nav-item mb-3">
              <a
                href="/settings"
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
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/* Main content + sidebar toggle */}
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
          <h1 className="h4 m-0 text-primary fw-bold">Reports</h1>
          <div></div>
        </header>

        {/* Content */}
        <main className="p-4 flex-grow-1 overflow-auto">
          <h2 className="mb-4">Inventory Reports</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Total Items</h5>
                  <p className="card-text display-6 fw-bold">{reportData.totalItems}</p>
                  <small className="text-muted">As of today</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Low Stock Items</h5>
                  <p className="card-text display-6 fw-bold text-danger">{reportData.lowStockItems}</p>
                  <small className="text-muted">Items below threshold</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Pending Deliveries</h5>
                  <p className="card-text display-6 fw-bold text-warning">{reportData.pendingDeliveries}</p>
                  <small className="text-muted">Awaiting arrival</small>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-5">
            <h3></h3>
            <div
              className="border rounded p-5 text-center text-muted"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              {/* Placeholder for charts */}
              <section className="mt-5">
  <h3>Reports & Charts</h3>
  <div className="row">
    <div className="col-md-6 mb-4">
      <div className="card shadow-sm border-0 p-3">
        <h5 className="mb-3">Inventory Overview (Bar Chart)</h5>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4e73df" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="col-md-6 mb-4">
      <div className="card shadow-sm border-0 p-3">
        <h5 className="mb-3">Inventory Distribution (Pie Chart)</h5>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
</section>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
