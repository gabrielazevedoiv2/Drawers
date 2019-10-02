import React from 'react';
import "./desktopbar.css";
import Drawer from '../drawer/drawer';
import { connect } from 'react-redux';
import {createNewWindow, openSSHModal} from '../../redux/actions';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

class DesktopBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            moment: new Date()
        }
    }

    updateMoment() {
        setTimeout(() => {
            const moment = new Date();            
            this.setState({moment});
        }, 1000);
    }

    getFormattedMoment() {
        return days[this.state.moment.getDay()] + "   " + this.state.moment.toLocaleTimeString().split(':').slice(0, 2).join(':');
    }

    openSSHModal() {
        
    }

    render() {
        this.updateMoment();
        return (
            <div className="app-bar">
                <div className="left-menu">
                    <div style={{display: 'flex'}}><button className="btn"><i style={{color: 'white', cursor: 'pointer'}} className="material-icons">menu</i></button></div>
                    {this.props.inactiveWindows.map((x, index) => <Drawer key={index} id={x.id} style={x.style} color={x.color} active={x.active}></Drawer>)}
                    <div style={{display: 'flex'}}><button onClick={($event) => this.props.openSSHModal()} className="btn"><i  style={{color: 'white', cursor: 'pointer'}} className="material-icons">add</i></button></div>
                </div>
                <div className="left-menu">
                    <div style={{color: 'white', fontSize: '18px'}}>{this.getFormattedMoment()}</div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewWindow: () => dispatch(createNewWindow()),
        openSSHModal: () => dispatch(openSSHModal())
    }
}

export default connect(null, mapDispatchToProps)(DesktopBar)