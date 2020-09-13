import React from 'react';
import {Catalog} from './Catalog/Catalog';
import './App.css';

function App() {
  const catalogProps = { loadCatalog: undefined };

  return (
    <div className="App">
      <Catalog {...catalogProps} />
    </div>
  );
}

export default App;
