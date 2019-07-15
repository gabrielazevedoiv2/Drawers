import React from 'react';
import './App.css';
import Drawer from './components/drawer';

function App() {
  return (
    <div className="App">
      <Drawer style={{top: 100, left: 100}} color="blue"></Drawer>
      <Drawer style={{top: 400, left: 400}} color="red"></Drawer>
    </div>
  );
}

export default App;
