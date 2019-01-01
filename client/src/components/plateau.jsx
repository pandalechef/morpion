import React from 'react';
import Morpion from '../containers/morpionContainer';
import Dialogue from './dialogue';
import { withRouter } from 'react-router-dom';
import withSocketContext from './withSocketContext';

const MorpionWithRouter = withSocketContext(withRouter(Morpion));
const DialogueWithSocket = withSocketContext(Dialogue);

export default () => (
  <React.Fragment>
    <MorpionWithRouter />
    <DialogueWithSocket />
  </React.Fragment>
);
