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

    topLeft(e) {
        this.resizeY(e, true);
        this.resizeX(e, true);
        this.repositionY(e);
        this.repositionX(e);
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

    reduceDrawingPosition() {
        return Object.entries(this.drawingPosition).find((x, index) => x[1] === true);
    }

    resize(e) {
        this.getResizingPosition(e);
        const position = this.reduceDrawingPosition();
        this[position[0]].call(this, e);
    }

    resizeX(e, reversible) {
        if (reversible) {
            this.drawer.style.width = ((this.drawer.clientWidth) + (this.drawer.getBoundingClientRect().left - (e.pageX))) + 'px';
        } else {
            this.drawer.style.width = ((this.drawer.clientWidth) + (e.pageX - (this.drawer.getBoundingClientRect().x + this.drawer.getBoundingClientRect().width))) + 'px';
        }        
    }

    resizeY(e, reversible) {
        if (reversible) {
            this.drawer.style.height = ((this.drawer.clientHeight) + (this.drawer.getBoundingClientRect().top - (e.pageY))) + 'px';
        } else {
            this.drawer.style.height = ((this.drawer.clientHeight) + (e.pageY - (this.drawer.getBoundingClientRect().y + this.drawer.getBoundingClientRect().height))) + 'px';
        }      
    }

    repositionX(e) {
        const rect = this.drawer.getBoundingClientRect();
        this.drawer.style.left = (rect.left - (rect.x - e.pageX)) + 'px';
    }

    repositionY(e) {
        const rect = this.drawer.getBoundingClientRect();
        this.drawer.style.top = (rect.top - (rect.y - e.pageY)) + 'px';
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
            <div style={{backgroundColor: this.props.color, width: 100, height: 100, position: "absolute", opacity: 0.5, ...this.props.style}} ref={elem => this.drawer = elem}>
            </div>
        )
    }
}