import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

class ListeJoueurs extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateListeJoueurs();
  }
  render() {
    const { listeJoueurs, nomJoueur } = this.props;
    return (
      <Grid style={{ width: '50%', margin: '0 auto' }} container>
        {listeJoueurs
          .filter(j => j.nom.toLowerCase() !== nomJoueur.toLowerCase())
          .map(joueur => (
            <Grid key={joueur.id} item xs={12}>
              <Link to={`/morpion?j1=${nomJoueur}&j2=${joueur.nom}`}>
                {joueur.nom}
              </Link>
            </Grid>
          ))}
      </Grid>
    );
  }
}
export default ListeJoueurs;