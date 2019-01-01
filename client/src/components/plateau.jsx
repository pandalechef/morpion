import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Case from './case';

export default class Plateau extends Component {
  componentDidMount() {
    this.props.chargerPartie();
  }

  renderSquare(i) {
    const {
      utilisateur,
      partie: { joueurEnCours, vainqueur }
    } = this.props;
    return (
      <Case
        valeur={this.props.partie.squares[i]}
        onClick={() =>
          this.props.handleClick(
            i,
            this.props.partie.squares[i],
            utilisateur,
            joueurEnCours,
            vainqueur
          )
        }
      />
    );
  }

  render() {
    if (!this.props.partie) {
      return <div>Chargement en cours</div>;
    }
    const { egalite, vainqueur } = this.props.partie;
    let statut;
    if (egalite) {
      statut = 'Egalité!';
    } else if (vainqueur) {
      statut = 'Le gagnant est: ' + vainqueur;
    } else {
      statut = "C'est à " + this.props.partie.joueurEnCours + ' de jouer';
    }

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ marginTop: '10px' }}
      >
        <Grid item xs={12}>
          {statut}
        </Grid>
        <Grid item xs={12}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </Grid>
        <Grid item xs={12}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </Grid>
        <Grid item xs={12}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </Grid>
      </Grid>
    );
  }
}
