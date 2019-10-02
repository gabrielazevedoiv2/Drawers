import React from 'react';
import {connect} from 'react-redux';
import {createNewWindow} from '../../redux/actions'

class SSHForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionData: {
                host: '',
                username: '',
                password: '',
            }
        }
    }

    handleInputChange(e) {
        const connectionData = {...this.state.connectionData}
        connectionData[e.target.name] = e.target.value;
        this.setState({connectionData});
    }

    handleCreateConnection() {
        this.props.createNewWindow({
            host: this.state.connectionData.host,
            username: this.state.connectionData.username,
            password: this.state.connectionData.password
        })
    }

    render() {
        return(
            <div className="sshform-wrapper" style={{...this.props.style}}>
                <div className="sshform">
                    <label style={{color: 'white'}}> Host:</label>
                    <input className="sshform-input" name={"host"} value={this.state.host} onChange={($event) => this.handleInputChange($event)}></input>
                    <label style={{color: 'white'}}> Username:</label>
                    <input className="sshform-input" name={"username"} value={this.state.username} onChange={($event) => this.handleInputChange($event)}></input>
                    <label style={{color: 'white'}}> Password:</label>
                    <input className="sshform-input" type="password" name={"password"} value={this.state.password} onChange={($event) => this.handleInputChange($event)}></input>                    
                    <button onClick={() => this.handleCreateConnection()} className={"sshform-button"}>Connect</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewWindow: (connectionData) => dispatch(createNewWindow(connectionData))
    }
}

export default connect(null, mapDispatchToProps)(SSHForm);