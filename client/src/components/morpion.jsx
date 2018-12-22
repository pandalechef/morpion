import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Plateau from '../containers/plateauContainer';
import withSocketContext from './withSocketContext';
import ListeJoueurs from '../containers/listeJoueursContainer';
import Header from '../containers/headerContainer';

const HeaderWithContext = withSocketContext(Header);
const Morpion = () => (
  <React.Fragment>
    <header>
      <HeaderWithContext />
    </header>
    <Switch>
      <Route path="/" exact component={withSocketContext(ListeJoueurs)} />
      <Route path="/morpion" component={withSocketContext(Plateau)} />
      <Redirect to="/" />
    </Switch>
  </React.Fragment>
);
export default Morpion;
