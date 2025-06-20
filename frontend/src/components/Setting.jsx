import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './Login';
import RegisterModal from './Register';

export default function Settings() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage on change
  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const backgroundColor = settings.darkMode ? "#1e1e2f" : "#f9fafb";
  const textColor = settings.darkMode ? "#f9fafb" : "#131D4F";

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor }}>
      {/* Sidebar */}
      {sidebarVisible && (
        <nav className="bg-white border-end shadow-sm" style={{ width: 250, padding: "1.5rem" }}>
          <h4 className="mb-4 fw-bold text-secondary">Inventory</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to="/" className="nav-link fw-semibold fs-5 px-3 py-2 rounded" style={{ color: "#131D4F" }}>Dashboard</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/items" className="nav-link fw-semibold fs-5 px-3 py-2 rounded" style={{ color: "#131D4F" }}>Items</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/reports" className="nav-link fw-semibold fs-5 px-3 py-2 rounded" style={{ color: "#131D4F" }}>Reports</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/deliveries" className="nav-link fw-semibold fs-5 px-3 py-2 rounded" style={{ color: "#131D4F" }}>Deliveries</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/settings" className="nav-link fw-semibold fs-5 px-3 py-2 rounded bg-primary text-light" aria-current="page">Settings</Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Main */}
      <div className="flex-grow-1 d-flex flex-column" style={{ color: textColor }}>
        <header className="d-flex align-items-center justify-content-between bg-white border-bottom px-4 py-2 shadow-sm">
          <button className="btn btn-outline-primary" onClick={() => setSidebarVisible(!sidebarVisible)}>
            {sidebarVisible ? "<" : ">"}
          </button>
          <h1 className="h4 m-0 text-primary fw-bold">Settings</h1>
          <div></div>
        </header>

        <main className="p-4 flex-grow-1 overflow-auto">
          <h2 className="mb-4">Application Settings</h2>

          <div className="mb-3 d-flex justify-content-between align-items-center">
            <span className="fs-5">Dark Mode (Cooming)</span>
            <button
              className={`btn ${settings.darkMode ? "btn-success" : "btn-secondary"}`}
              onClick={() => handleToggle('darkMode')}
            >
              {settings.darkMode ? 'On' : 'Off'}
            </button>
          </div>

          <div className="mb-3 d-flex justify-content-between align-items-center">
            <span className="fs-5">Notifications (Cooming)</span>
            <button
              className={`btn ${settings.notifications ? "btn-success" : "btn-secondary"}`}
              onClick={() => handleToggle('notifications')}
            >
              {settings.notifications ? 'On' : 'Off'}
            </button>
          </div>

          <div className='mb-3 d-flex justify-content-between align-items-center'>
            <span className='fs-5'>User:</span>

            {localStorage.getItem("user") ? (
              <div className="d-flex align-items-center gap-3">
                <span className='fw-bold fs-5'>
                  {JSON.parse(localStorage.getItem("user")).username}
                </span>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/settings"; // or use navigate() if using React Router hook
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
              <button
                className="btn btn-primary"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>

              {/*Login modal & Register modal*/}
              <LoginModal show={showLogin} onClose={() => setShowLogin(false)} onSwitchToRegister={()=>{ setShowLogin(false); setShowRegister(true);}} />
              <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} onSwitchToLogin={()=>{ setShowRegister(false); setShowLogin(true);}} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
