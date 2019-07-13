import React from 'react';

export default class Drawer extends React.Component {

    constructor(props) {
        super(props)
        this.previousMouseX = 0;
        this.previousMouseY = 0;
        this.drawingBounds = 10;
        this.drawingPosition = {
            topLeft: false,
            top: false,
            topRight: false,
            right: false,
            bottomRight: false,
            bottom: false,
            bottomLeft: false,
            left: false,
        }
        this.isDrawing = false;
    }

    componentDidMount() {
        this.drawer.addEventListener('mousedown', ($event) => this.initResize($event));
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
            }
        }
        this.isDrawing = false;
    }

    resize(e) {
        this.getResizingPosition(e);
        this.resizeX(e);
    }

    resizeX(e) {
        console.log(this.drawer.clientWidth)
        console.log(e.pageX - this.previousMouseX)
        this.drawer.style.width = ((this.drawer.clientWidth) + (e.pageX - this.previousMouseX)) + 'px';
    }

    resizeY(e) {
        this.drawer.style.height = ((this.drawer.clientHeight) + (e.pageY - this.previousMouseY)) + 'px';
    }

    stopResize(drawer) {
        window.removeEventListener('mousemove');
        window.removeEventListener('mouseup');
    }

    initResize(e) {
        this.isDrawing = true;
        this.previousMouseY = e.pageY;
        this.previousMouseX = e.pageX;
        const resizerFunc = ($event) => {this.resize($event)}
        window.addEventListener('mousemove', resizerFunc);
        window.addEventListener('mouseup', function () {
            window.removeEventListener('mousemove', resizerFunc);
            window.removeEventListener('mouseup', this);
        });
    }

    render() {
        return (
            <div style={{backgroundColor: this.props.color, width: 100, height: 100, position: "absolute", opacity: 0.5}} ref={elem => this.drawer = elem}>
            </div>
        )
    }
}