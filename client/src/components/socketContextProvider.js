import React, { Component } from 'react';
import io from 'socket.io-client';

export const SocketContext = React.createContext('SocketContext');
// Creates a provider Component
class Socket extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:4000/');
    this.socket.on('chat message', msg =>
      this.setState({ messages: this.state.messages.concat(msg) })
    );
  }
  render() {
    return (
      <SocketContext.Provider value={this.socket}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}
export default Socket;
