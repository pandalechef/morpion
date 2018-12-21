import React from 'react';
import { SocketContext } from './socketContextProvider';
const withSocketContext = Component => props => {
  return (
    <SocketContext.Consumer>
      {socket => <Component {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};
export default withSocketContext;
