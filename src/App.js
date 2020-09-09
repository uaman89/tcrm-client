import React from 'react';
import './App.css';

import { Sync } from './Sync/Sync';
import { AppNavbar } from './Navbar/AppNavbar';
import { Catalog } from './Catalog/Catalog';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Catalog />
      <Sync />
    </div>
  );
}

export default App;
