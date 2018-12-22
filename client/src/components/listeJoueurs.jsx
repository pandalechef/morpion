import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom';
import lodash from 'lodash';

class ListeJoueurs extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateListeJoueurs();
  }
  render() {
    const { listeJoueurs, utilisateur } = this.props;
    const listeJoueursTriee = lodash.sortBy(listeJoueurs, ['nom']);
    return (
      <Grid style={{ width: '90%', margin: '0 auto' }} container spacing={8}>
        {listeJoueursTriee
          .filter(j => j.nom.toLowerCase() !== utilisateur.toLowerCase())
          .map(joueur => (
            // <Grid key={joueur.id} item xs={12}>
            //   <Link to={`/morpion?j1=${nomJoueur}&j2=${joueur.nom}`}>
            //     {joueur.nom}
            //   </Link>
            // </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3} key={joueur.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      <FiberManualRecord
                        style={{
                          verticalAlign: 'middle',
                          color: joueur.online ? 'green' : 'red'
                        }}
                      />
                      {joueur.nom}
                    </Typography>
                    <Typography component="p">Nombre de victoires:</Typography>
                    <Typography component="p">Nombre de défaites:</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link
                    to={`/morpion?j1=${utilisateur}&j2=${joueur.nom}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button size="small" color="primary" variant="outlined">
                      Accéder à la partie
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  }
}
export default ListeJoueurs;
