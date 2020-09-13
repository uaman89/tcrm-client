import React from 'react';
import {AppNavbar} from './Navbar/AppNavbar';
import {Catalog} from './Catalog/Catalog';
import './App.css';

function App() {
  const catalogProps = { loadCatalog: undefined };

  return (
    <div className="App">
      <AppNavbar />
      <Catalog {...catalogProps} />
    </div>
  );
}

export default App;
