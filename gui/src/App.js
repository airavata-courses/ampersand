import React from "react";
import { Route, Routes } from "react-router-dom";
// import Dashboard from "./Dashboard"
import HomePage from "./HomePage"
import Radar from "./components/Radar"
import Merra from "./components/Merra"
import Choice from "./choice"
import UReq from "./URequest"
import MUReq from "./MURequest"
import './App.css';

function App() {
  return (
      <div className="App">
            <Routes>
                <Route exact path="/" element={<HomePage/>} />
                {/* <Route exact path="/dashboard" element={<Dashboard/>} /> */}
                <Route exact path="/radar" element={<Radar/>} />
                <Route exact path="/merra" element={<Merra/>} />
                <Route exact path="/choice" element={<Choice/>} />
                <Route exact path="/user/request" element={<UReq/>} />
                <Route exact path="/user/mrequest" element={<MUReq/>} />
            </Routes>
      </div>
  );
}

export default App;