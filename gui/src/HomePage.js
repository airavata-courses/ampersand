import './App.css'
import logo from './logo.svg'
import React from 'react'


function App() {
  document.title = "Login Page";
    return( 
      <div className='App'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <a href="http://localhost:5000/auth/google">Sign in with Google</a>
        </header>
      </div>
    );
}

export default App;