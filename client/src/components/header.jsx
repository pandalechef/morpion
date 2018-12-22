import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
const Header = props => (
  <AppBar position="static">
    <Toolbar>
      <Link
        to={`/`}
        style={{ textAlign: 'middle', color: 'white', marginRight: '15px' }}
      >
        <Home />
      </Link>
      <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
        {`Bienvenue ${props.utilisateur}`}
      </Typography>
      <Button color="inherit" onClick={() => props.updateUtilisateur(null)}>
        <PowerSettingsNew style={{ marginRight: '5px' }} />
        Déconnexion
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
