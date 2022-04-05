import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard"
import HomePage from "./HomePage"
import Temp from "./temp"
import UReq from "./URequest"
import './App.css';

function App() {
  return (
      <div className="App">
            <Routes>
                <Route exact path="/" element={<HomePage/>} />
                <Route exact path="/dashboard" element={<Dashboard/>} />
                <Route exact path="/temp" element={<Temp/>} />
                <Route exact path="/user/request" element={<UReq/>} />
            </Routes>
      </div>
  );
}

export default App;