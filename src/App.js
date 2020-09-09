import React from 'react';
import './App.css';

import { Sync } from './Sync/Sync';
import { Navbar } from './Navbar/Navbar';

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <Sync></Sync>
    </div>
  );
}

export default App;
