import React from "react";
import "./index.css";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    document.getElementById('root')
);