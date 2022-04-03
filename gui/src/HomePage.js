import './App.css'
import logo from './logo.svg'
import React from 'react'
const axios = require('axios')

const host_url = require('./Utilities.js');

function App() {
  document.title = "Login Page";
  console.log(host_url.host_url+":30001/auth")
  console.log(host_url)
  
  // gateway call for authentication
  axios.get(host_url.host_url+":30001/auth")
  .then(res => {
    console.log(res);
    const google_url = (res.data.url)
    document.getElementById("loc").href = google_url;
  });

    return( 
      <div className='App'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <a id="loc" href="">Sign in with Google</a>
        </header>
      </div>
    );
}

export default App;