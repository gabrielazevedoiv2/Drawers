import React from 'react';

const styles = {
    appBar: {
        height: 40, 
        backgroundColor: 'rgba(216, 30, 91, 0.5)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0px 14px',
        fontSize: '12px'
    }
}

export default class DesktopBar extends React.Component {


    render() {
        return (
            <div style={styles.appBar}>
                <div><i style={{color: 'white', cursor: 'pointer'}} className="material-icons">menu</i></div>
                <div style={{color: 'white', }}>{new Date().toLocaleTimeString().split(':').slice(0, 2).join(':')}</div>
            </div>
        )
    }
}