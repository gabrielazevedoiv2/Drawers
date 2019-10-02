import React from 'react';
import Drawer from './components/drawer/drawer';
import './App.css';
import DesktopBar from './components/desktopbar/desktopbar';
import {connect} from 'react-redux';
import SSHForm from './components/sshform/sshform';

const styles = {
  app: {
    background: 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
    height: '100vh',
  }
}

class App extends React.Component {

  getActiveWindows = () => {
    return this.props.drawers.filter((x) => x.active === true);
  }

  getInactiveWindows = () => {
    return this.props.drawers.filter((x) => x.active === false);
  }

  renderActiveWindows = () => {
    const activeWindows = this.getActiveWindows();
    return activeWindows.map((x, index) => <Drawer key={index} id={x.id} style={x.style} color={x.color} active={x.active}></Drawer>)
  }

  render() {
    return (
      <div className="App" style={styles.app}>
        <DesktopBar inactiveWindows={this.getInactiveWindows()}></DesktopBar>
        {this.props.modalOpen?<SSHForm></SSHForm>:''}
        <div>
          {
            this.renderActiveWindows()
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawers: state.drawers,
    modalOpen: state.SSHModalOpen
  }
}

export default connect(mapStateToProps)(App);
