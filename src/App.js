import React from 'react';
import './App.css';
import Drawer from './components/drawer/drawer';
import DesktopBar from './components/desktopbar/desktopbar';

const styles = {
  app: {
    background: 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
    height: '100vh',
  }
}

function App() {
  return (
    <div className="App" style={styles.app}>
      <DesktopBar></DesktopBar>
      <Drawer style={{top: 100, left: 100}} color="rgba(255, 0, 0, 0.5)"></Drawer>
      <Drawer style={{top: 400, left: 400}} color="rgba(0, 255, 0, 0.5)"></Drawer>
    </div>
  );
}

export default App;
