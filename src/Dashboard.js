// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import PostForm from './components/PostForm';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  useEffect(()=>{
    (async () => {
      const result = await axios.get('http://192.168.1.108:5001/', {
        withCredentials: true
      });
      setName(result.data.fullName);
      console.log("name = ");
      console.log(name);
    })()
  },);
    return( 
      <div className='App'>
        <PostForm />
      </div>
    );
}

export default App;