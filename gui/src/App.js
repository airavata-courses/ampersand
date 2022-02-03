import './App.css';
import React from "react";
import Home from "./Home"
import Dashboard from "./Dashboard"
import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <Routes>
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
  );
}

export default App;