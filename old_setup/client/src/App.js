import './App.css';
import axios from 'axios';
import React from 'react';

function App() {
  const hitBackend = () => {
    axios.get('/test')
    .then((response) => {
    console.log(response.data)
    })
    }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          WIP:
        </p>
        <h1>
          Mathshub Website
        </h1>
      </header>
      <button onClick={hitBackend}>Send request</button>
    </div>
  );
}

export default App;
