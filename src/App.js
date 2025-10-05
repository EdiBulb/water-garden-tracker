import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Welcome from "./pages/Welcome";
import Stats from "./pages/Stats";

import CalendarView from "./pages/CalendarView";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#e0f7fa" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/history" style={{ marginRight: "10px" }}>History</Link>
        <Link to="/calendar" style={{ marginRight: "10px" }}>Calendar</Link>
        <Link to="/stats" style={{ marginRight: "10px" }}> Stats</Link>
        <Link to="/welcome">Welcome</Link>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/calendar" element={<CalendarView/>}/>
        <Route path="/stats" element={<Stats />} />

        <Route path="/welcome" element={<Welcome />} />
        
      </Routes>
    </Router>
  );
}

export default App;
