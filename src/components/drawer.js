import React from 'react';

const styles = {
    drawer: {
        minWidth: 100, 
        minHeight: 100, 
        position: "absolute", 
        opacity: 0.6, 
        borderRadius: '5px'
    },
    header: {
        position: 'relative', 
        opacity: 0.4, 
        backgroundColor: 'black',
        borderRadius: '5px 5px 0 0'
    }
}
const cursors = {
    topLeft: 'nw-resize',
    top: 'n-resize',
    topRight: 'ne-resize',
    right: 'e-resize',
    bottomRight: 'se-resize',
    bottom: 's-resize',
    bottomLeft: 'sw-resize',
    left: 'w-resize',
    drag: 'default'
}

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

    topLeft(e) {
        this.resizeY(e, true);
        this.resizeX(e, true);
        this.repositionY(e);
        this.repositionX(e);
    }

    top(e) {
        this.resizeY(e, true)
        this.repositionY(e);
    }

    topRight(e) {
        this.resizeX(e);
        this.resizeY(e, true);
        this.repositionY(e);
    }

    right(e) {
        this.resizeX(e);
    }

    bottomRight(e) {
        this.resizeX(e);
        this.resizeY(e);
    }

    bottom(e) {
        this.resizeY(e);
    }

    bottomLeft(e) {
        this.resizeX(e, true);
        this.resizeY(e);
        this.repositionX(e);
    }

    left(e) {
        this.resizeX(e, true);
        this.repositionX(e);
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
            this[position[0]].call(this, e);
        }
    }

    resizeX(e, reversible) {
        const rect = this.drawer.getBoundingClientRect();
        if (reversible) {
            this.drawer.style.width = ((this.drawer.clientWidth) + (rect.left - (e.pageX))) + 'px';
        } else {
            this.drawer.style.width = ((this.drawer.clientWidth) + (e.pageX - (rect.x + rect.width))) + 'px';
        }        
    }

    resizeY(e, reversible) {
        const rect = this.drawer.getBoundingClientRect();
        if (reversible) {
            this.drawer.style.height = ((this.drawer.clientHeight) + (rect.top - (e.pageY))) + 'px';
        } else {
            this.drawer.style.height = ((this.drawer.clientHeight) + (e.pageY - (rect.y + rect.height))) + 'px';
        }      
    }

    repositionX(e, padding) {
        const rect = this.drawer.getBoundingClientRect();
        if (padding) {
            this.drawer.style.left = ((rect.left - (rect.x - e.pageX)) - padding) + 'px';
        } else {
            this.drawer.style.left = (rect.left - (rect.x - e.pageX)) + 'px';
        }
    }

    repositionY(e, padding) {
        const rect = this.drawer.getBoundingClientRect();
        if (padding) {
            this.drawer.style.top = ((rect.top - (rect.y - e.pageY)) - padding) + 'px';
        } else {
            this.drawer.style.top = (rect.top - (rect.y - e.pageY)) + 'px';
        }
    }

    drag(e) {
        const rect = this.drawer.getBoundingClientRect();
        const distanceX = rect.width - (rect.width - this.clickedX);
        const distanceY = rect.height - (rect.height - this.clickedY);
        this.repositionX(e, distanceX);
        this.repositionY(e, distanceY);
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