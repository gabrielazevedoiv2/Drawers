import React from 'react';
import logo from './logo.svg';
import './App.css';
import Drawer from './components/drawer';

function App() {
  return (
    <div className="App">
      <Drawer color="blue"></Drawer>
      <div style={{marginLeft: '400px'}}>
        <Drawer color="red"></Drawer>
      </div>
    </div>
  );
}

export default App;
