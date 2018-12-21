import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Case from './case';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default class Plateau extends Component {
  componentDidMount() {
    this.props.chargerPartie();
  }

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext
  //   });
  // }

  renderSquare(i) {
    const {
      nomJoueur,
      partie: { joueurEnCours }
    } = this.props;
    return (
      <Case
        valeur={this.props.partie.squares[i]}
        onClick={() => this.props.handleClick(i, this.props.partie.squares[i], nomJoueur, joueurEnCours)}
      />
    );
  }

  render() {
    if (!this.props.partie) {
      return <div>Chargement en cours</div>;
    }
    const winner = calculateWinner(this.props.partie.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = "C'est à " + this.props.partie.joueurEnCours + ' de jouer';
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          {status}
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
