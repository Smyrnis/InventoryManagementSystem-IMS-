// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryDashboard from "./components/ProcessForm";
import ItemsPage from "./components/ItemsPage"; // This should be the page that lists and manages items
import Reports from "./components/reports"; // Assuming this is the reports component
import Deliveries from "./components/Deliveries"; // Assuming this is the deliveries component
import Setting from "./components/Setting"; // Assuming this is the settings component
import RegisterPage from "./components/Register";
import LoginPage from "./components/Login";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryDashboard />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
