import React from 'react';
import Morpion from '../containers/morpionContainer';
import Dialogue from '../containers/dialogueContainer';
import { withRouter } from 'react-router-dom';
import withSocketContext from './withSocketContext';
import { Grid } from '@material-ui/core';

const MorpionWithRouter = withSocketContext(withRouter(Morpion));
const DialogueWithSocket = withSocketContext(withRouter(Dialogue));

export default () => (
  <Grid container direction="column" alignItems="center" justify="center">
    <Grid item>
      <MorpionWithRouter />
    </Grid>
    <Grid>
      <DialogueWithSocket />
    </Grid>
  </Grid>
);
