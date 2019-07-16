import React from 'react';
import './App.css';
import Drawer from './components/drawer';

function App() {
  return (
    <div className="App" style={{background: 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)', height: '100vh'}}>
      <div style={{height: 40, backgroundColor: '#D81E5B', opacity: 0.5}}></div>
      <Drawer style={{top: 100, left: 100}} color="cyan"></Drawer>
      <Drawer style={{top: 400, left: 400}} color="red"></Drawer>
    </div>
  );
}

export default App;
