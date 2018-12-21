var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let joueurs = [];
let parties = [];

const trouverPartie = (j1, j2) => {
  const partie = parties.filter(p => matchPartieJoueurs(p, j1, j2));
  if (partie.length === 1) {
    return partie[0];
  } else {
    console.error('partie non trouvée!');
    return null;
  }
};

const matchPartieJoueurs = (partie, j1, j2) =>
  (partie.j1.toLowerCase() === j1.toLowerCase() ||
    partie.j1.toLowerCase() === j2.toLowerCase()) &&
  (partie.j2.toLowerCase() === j1.toLowerCase() ||
    partie.j2.toLowerCase() === j2.toLowerCase());

const envoyerNotification = (joueur1, joueur2, partieACharger) => {
  const j1 = joueurs.filter(j => j.nom.toLowerCase() === joueur1.toLowerCase())[
    0
  ];
  const j2 = joueurs.filter(j => j.nom.toLowerCase() === joueur2.toLowerCase())[
    0
  ];
  if (j1 !== undefined && j2 !== undefined) {
    io.to(j1.id).to(j2.id).emit('charger partie', partieACharger);
  }
};

const updatePartie = (partie, caseCochee, j1, j2) => {
  partie.squares[caseCochee] = partie.joueurEnCours;
  partie.joueurEnCours = partie.joueurEnCours.toLowerCase() === j1.toLowerCase()
    ? j2.toLowerCase()
    : j1.toLowerCase();
  parties = [...parties.filter(p => !matchPartieJoueurs(p, j1, j2)), partie];
};

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('nouveau joueur', function(nomJoueur) {
    console.log('nouveau joueur: ' + nomJoueur);
    if (
      joueurs.filter(j => j.nom.toLowerCase() === nomJoueur.toLowerCase())
        .length === 0
    ) {
      joueurs.push({ id: socket.id, nom: nomJoueur });
    } else {
      joueurs = [
        ...joueurs.filter(j => j.nom.toLowerCase() !== nomJoueur.toLowerCase()),
        { id: socket.id, nom: nomJoueur }
      ];
    }
  });
  socket.on('listeJoueurs', () => {
    io.emit('listeJoueurs', joueurs);
  });

  socket.on('charger partie', function(msg) {
    const nouvellePartie = {
      squares: Array(9).fill(null),
      j1: msg.j1,
      j2: msg.j2,
      joueurEnCours: Math.random() > 0.5 ? msg.j1 : msg.j2
    };
    const partieEnCours = parties.filter(p =>
      matchPartieJoueurs(p, msg.j1, msg.j2)
    );
    let partieACharger;
    if (partieEnCours.length === 1) {
      partieACharger = partieEnCours[0];
    } else {
      partieACharger = nouvellePartie;
      console.log('ajout nouvelle partie');
      parties.push(partieACharger);
    }
    envoyerNotification(msg.j1, msg.j2, partieACharger);
  });

  socket.on('case cochee', function(data) {
    const { j1, j2, caseCochee } = data;
    console.log('case cochée ', j1, j2, caseCochee);
    const partie = trouverPartie(j1, j2);
    if (partie) {
      updatePartie(partie, caseCochee, j1, j2);
      envoyerNotification(j1, j2, partie);

      // const joueur1 = joueurs.filter(

      //   j => j.nom.toLowerCase() === j1.toLowerCase()

      // )[0];

      // const joueur2 = joueurs.filter(

      //   j => j.nom.toLowerCase() === j2.toLowerCase()

      // )[0];

      // if (joueur1 !== undefined && joueur2 !== undefined) {

      //   io.to(joueur1.id).to(joueur2.id).emit('charger partie', partie);

      // }
    }
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(4000, function() {
  console.log('listening on *:4000');
});

app.get('/parties', function(req, res) {
  res.send(parties);
});
