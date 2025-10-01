import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#e0f7fa" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/history" style={{ marginRight: "10px" }}>History</Link>
        <Link to="/welcome">Welcome</Link>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
