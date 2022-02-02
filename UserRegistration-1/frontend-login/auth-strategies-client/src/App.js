import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="http://localhost:5000/auth/google">Sign in with Google</a>
      </header>
    </div>
  );
}

export default App;
