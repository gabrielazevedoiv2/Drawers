import React from 'react';
import {styles, cursors} from './drawercss';
import DrawerResizingController from './drawerResizingController';

export default class Drawer extends React.Component {

    constructor(props) {
        super(props)
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
    }

    componentDidMount() {
        this.drawer.addEventListener('mousedown', ($event) => this.initResize($event));
        this.drawer.addEventListener('mousemove', ($event) => this.hoverResize($event));
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
            }            
        }
    }

    drag(e) {
        const rect = this.drawer.getBoundingClientRect();
        const distanceX = rect.width - (rect.width - this.clickedX);
        const distanceY = rect.height - (rect.height - this.clickedY);
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
        window.addEventListener('mouseup', function () {
            window.removeEventListener('mousemove', resizerFunc);
            window.removeEventListener('mouseup', this);
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
        return (
            <div style={{backgroundColor: this.props.color, ...styles.drawer, ...this.props.style}} ref={elem => this.drawer = elem}>
                <div style={{...styles.header, height: this.drawerHeaderSize,}} ref={elem => this.header = elem}></div>
            </div>
        )
    }
}