import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Sync } from './sync/Sync';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Upload catalog:
          <Sync></Sync>
        </p>
      </header>
    </div>
  );
}

export default App;
