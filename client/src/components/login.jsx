import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, TextField, Button, Paper } from '@material-ui/core';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { utilisateur: '', isOnBlur: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleChange(e) {
    this.setState({ utilisateur: e.currentTarget.value });
  }

  handleOnBlur() {
    this.setState({ isOnBlur: true });
  }

  render() {
    const { utilisateur, isOnBlur } = this.state;

    if (this.props.utilisateur !== null) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    }
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', backgroundColor: '#f1f2f6' }}
      >
        <Paper style={{ padding: '10px' }}>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              required
              label="Nom du joueur"
              onChange={this.handleChange}
              value={utilisateur}
              margin="normal"
              error={isOnBlur && utilisateur === ''}
              onBlur={this.handleOnBlur}
              helperText={
                isOnBlur && utilisateur === '' ? 'Champs obligatoire' : ''
              }
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '15px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.updateUtilisateur(utilisateur)}
            >
              Valider
            </Button>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}
export default Login;
