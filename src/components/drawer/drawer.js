import React from 'react';
import {cursors} from './drawercss';
import './drawer.css'
import DrawerResizingController from './drawerResizingController';
import { connect } from 'react-redux';
import { inactivateWindow, activateWindow, closeWindow, maximizeWindow, updatePosition } from '../../redux/actions';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import '../../../node_modules/xterm/dist/xterm.css';

class Drawer extends React.Component {

    constructor(props) {
        super(props)
        // socket: window.io('http://localhost:3010'),
        this.socket = window.io('https://goazevedo.me');
        this.state = {
            connectionData: {...this.props.connectionData}
        }
        this.previousMouseX = 0;
        this.previousMouseY = 0;
        this.drawingBounds = 6;
        this.drawingPosition = {
            topLeft: false,
            top: false,
            topRight: false,
            right: false,
            bottomRight: false,
            bottom: false,
            bottomLeft: false,
            left: false,
            drag: false,
        }
        this.isDrawing = false;
        this.drawerHeaderSize = 25;
        Terminal.applyAddon(fit)
        this.terminal = new Terminal({
            allowTransparency: true,
            cursorBlink: true,
            convertEol: true,
            theme: {
                background: "rgba(0, 0, 0, 0)",
                cursor: '#ffffff',
                selection: 'rgba(255, 255, 255, 0.3)',
                black: '#000000',
                red: '#e06c75',
                brightRed: '#e06c75',
                green: '#A4EFA1',
                brightGreen: '#A4EFA1',
                brightYellow: '#EDDC96',
                yellow: '#EDDC96',
                magenta: '#e39ef7',
                brightMagenta: '#e39ef7',
                cyan: '#5fcbd8',
                brightBlue: '#5fcbd8',
                brightCyan: '#5fcbd8',
                blue: '#5fcbd8',
                white: '#d0d0d0',
                brightBlack: '#808080',
                brightWhite: '#ffffff'
            }
        });
        if (this.props.connectionData.host !== '' || this.props.connectionData.username !== '' || this.props.connectionData.password !== '') {
            this.initSSH(this.props.connectionData.host, this.props.connectionData.username, this.props.connectionData.password);
        }
    }

    componentDidMount() {
        if (this.props.active) {
            this.drawer.addEventListener('mousedown', ($event) => this.initResize($event));
            this.drawer.addEventListener('mousemove', ($event) => this.hoverResize($event));
            this.terminal.onKey(e => this.terminal.write(e.key));
        }
        if (this.body) {
            this.terminal.open(this.body)
            this.terminal.fit();
        }
    }

    initSSH(host, username, password) {
        this.socket.emit('athenaConnected', {
            host,
            username,
            password
        });
        this.socket.on('connect', () => {
            this.terminal.write("Connected to backend server");
        });
        this.socket.on('data', (data) => {
            this.terminal.write(data);
        });
        this.socket.on('error', (data) => {
            console.log(data);
            this.terminal.write("******Error - Restart the Terminal******")
        })
        this.socket.on('disconnect', () => {
            this.terminal.write('Disconnected from server');
        });
        this.terminal.on('data', (data) => {
            this.socket.emit('data', data);
        });
    }

    getResizingPosition = (e) => {
        const xPos = e.layerX;
        const yPos = e.layerY;
        if (this.isDrawing === true) {
            this.drawingPosition = {
                topLeft: (xPos < this.drawingBounds && yPos < this.drawingBounds)?true:false,
                top: (xPos > this.drawingBounds && yPos < this.drawingBounds && xPos < (this.drawer.clientWidth - this.drawingBounds))?true:false,
                topRight: (xPos > (this.drawer.clientWidth - this.drawingBounds) && yPos < this.drawingBounds)?true:false,
                right: (xPos > (this.drawer.clientWidth - this.drawingBounds) && yPos > this.drawingBounds && yPos < (this.drawer.clientHeight - this.drawingBounds))?true:false,
                bottomRight: (xPos > (this.drawer.clientWidth - this.drawingBounds) && yPos > (this.drawer.clientHeight - this.drawingBounds))?true:false,
                bottom: (xPos > this.drawingBounds && yPos > (this.drawer.clientHeight - this.drawingBounds) && xPos < (this.drawer.clientWidth - this.drawingBounds))?true:false,
                bottomLeft: (xPos < this.drawingBounds && yPos > (this.drawer.clientHeight - this.drawingBounds))?true:false,
                left: (xPos < this.drawingBounds && yPos > this.drawingBounds && yPos < (this.drawer.clientHeight - this.drawingBounds))?true:false,
                drag: (xPos > this.drawingBounds && yPos > this.drawingBounds && yPos < (this.drawerHeaderSize+1))?true:false
            }
        }
        this.isDrawing = false;
        return this.reduceDrawingPosition(this.drawingPosition);
    }

    getHoveringPosition(e) {
        const xPos = e.layerX;
        const yPos = e.layerY;
        const hoveringPosition = {
            topLeft: (xPos < this.drawingBounds && yPos < this.drawingBounds)?true:false,
            top: (xPos > this.drawingBounds && yPos < this.drawingBounds && xPos < (this.drawer.clientWidth - this.drawingBounds))?true:false,
            topRight: (xPos > (this.drawer.clientWidth - this.drawingBounds) && yPos < this.drawingBounds)?true:false,
            right: (xPos > (this.drawer.clientWidth - this.drawingBounds) && yPos > this.drawingBounds && yPos < (this.drawer.clientHeight - this.drawingBounds))?true:false,
            bottomRight: (xPos > (this.drawer.clientWidth - this.drawingBounds) && yPos > (this.drawer.clientHeight - this.drawingBounds))?true:false,
            bottom: (xPos > this.drawingBounds && yPos > (this.drawer.clientHeight - this.drawingBounds) && xPos < (this.drawer.clientWidth - this.drawingBounds))?true:false,
            bottomLeft: (xPos < this.drawingBounds && yPos > (this.drawer.clientHeight - this.drawingBounds))?true:false,
            left: (xPos < this.drawingBounds && yPos > this.drawingBounds && yPos < (this.drawer.clientHeight - this.drawingBounds))?true:false,
            drag: (xPos > this.drawingBounds && yPos > this.drawingBounds && yPos < (this.drawerHeaderSize+1))?true:false
        }
        return this.reduceDrawingPosition(hoveringPosition);
    }

    reduceDrawingPosition(object) {
        return Object.entries(object).find((x, index) => x[1] === true);
    }

    resize(e) {        
        const position = this.getResizingPosition(e);
        if (position) {
            if (position[0] === 'drag') {
                this.drag(e);
            } else {
                DrawerResizingController[position[0]].call(this, this.drawer, e);
                this.terminal.fit();
            }            
        }
    }

    drag(e) {
        const rect = this.drawer.getBoundingClientRect();
        const distanceX = rect.width - (rect.width - this.clickedX);
        const distanceY = rect.height - (rect.height - this.clickedY);
        if (e.clientY-distanceY < 40) return;
        DrawerResizingController.repositionX(this.drawer, e, distanceX);
        DrawerResizingController.repositionY(this.drawer, e, distanceY);
    }

    stopResize() {
        window.removeEventListener('mousemove');
        window.removeEventListener('mouseup');
    }

    initResize(e) {
        this.isDrawing = true;
        this.clickedY = e.layerY;
        this.clickedX = e.layerX;
        this.previousMouseY = e.pageY;
        this.previousMouseX = e.pageX;
        const resizerFunc = ($event) => {this.resize($event)}
        window.addEventListener('mousemove', resizerFunc);
        const endResizing = () => {
            if (this.drawer) {
                this.props.updatePosition(this.props.id, {
                    top: this.drawer.getBoundingClientRect().top, 
                    left: this.drawer.getBoundingClientRect().left, 
                    width: this.drawer.getBoundingClientRect().width, 
                    height: this.drawer.getBoundingClientRect().height
                });
            }
        }
        window.addEventListener('mouseup', function () {
            window.removeEventListener('mousemove', resizerFunc);
            window.removeEventListener('mouseup', this);
            endResizing();
        });
    }

    hoverResize(e) {        
        const position = this.getHoveringPosition(e);
        if (position) {
            this.drawer.style.cursor = cursors[position[0]];
        } else {
            this.drawer.style.cursor = 'default';
        }
    }

    render() {
        if (this.props.active) {
            return this.defaultRender();
        } else {
            return this.minimizedRender();
        }
    }

    inactivateWindow() {
        this.props.inactivate(this.props.id);
    }

    closeWindow() {
        this.props.close(this.props.id)
    }

    defaultRender() {
        return (
            <div className="drawer" style={{backgroundColor: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.props.color.a})`, ...this.props.style}} ref={elem => this.drawer = elem}>
                <div className="header" style={{height: this.drawerHeaderSize, color: 'white'}} ref={elem => this.header = elem}>
                    {this.props.connectionData.host}
                    <div onClick={() => this.inactivateWindow()} className="topButton"><i className="material-icons minimizeIcon">minimize</i></div>
                    <div onClick={() => this.props.maximize(this.props.id)} className="topButton"><i className="material-icons maximizeIcon">crop_square</i></div>
                    <div onClick={() => this.closeWindow()} className="topButton"><i className="material-icons closeIcon">close</i></div>
                </div>
                <div style={{height: `calc(100% - ${this.drawerHeaderSize}px)`, width: '100%'}} ref={elem => this.body = elem}></div>
            </div>
        )
    }
    
    minimizedRender() {
        return (
            <div onClick={() => this.props.activate(this.props.id)} className="mini-drawer" style={{backgroundColor: `rgba(${this.props.color.r}, ${100}, ${100}, 0.6)`}}>
                <div className="mini-header"></div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        connectionData: state.drawers.find((x) => x.id === ownProps.id).connectionData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        inactivate: (id) => dispatch(inactivateWindow(id)),
        activate: (id) => dispatch(activateWindow(id)),
        close: (id) => dispatch(closeWindow(id)),
        maximize: (id) => dispatch(maximizeWindow(id)),
        updatePosition: (id, drawerBounds) => dispatch(updatePosition(id, drawerBounds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)