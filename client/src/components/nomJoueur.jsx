import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

class NomJoueur extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { nomJoueur: this.props.nomJoueur };
  }
  handleChange(e) {
    this.setState({ nomJoueur: e.currentTarget.value });
  }
  render() {
    const { nomJoueur } = this.state;
    return (
      <Grid style={{ width: '50%', margin: '0 auto' }} container>
        <Grid item xs={12}>
          <TextField
            id="standard-name"
            label="Nom du joueur"
            value={nomJoueur}
            onChange={this.handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.updateNomJoueur(nomJoueur)}
          >
            Valider
          </Button>
        </Grid>
      </Grid>
    );
  }
}
export default NomJoueur;
