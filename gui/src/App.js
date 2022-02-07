import './App.css'
import React from "react"
import UReq from "./URequest"
import HomePage from "./HomePage"
import Dashboard from "./Dashboard"
import { Routes, Route} from "react-router-dom"

function App() {
  return (
      <div className="App">
        <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/user/request" element={<UReq/>} />
            {/* <Redirect to="/"/> */}
        </Routes>
      </div>
  );
}

export default App;