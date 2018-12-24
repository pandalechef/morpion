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
  const j1 = joueurs.filter(
    j => j.nom.toLowerCase() === joueur1.toLowerCase()
  )[0];
  const j2 = joueurs.filter(
    j => j.nom.toLowerCase() === joueur2.toLowerCase()
  )[0];
  if (j1 !== undefined && j2 !== undefined) {
    io.to(j1.id)
      .to(j2.id)
      .emit('charger partie', partieACharger);
  }
};

const calculateWinner = squares => {
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
};

const updatePartie = (partie, caseCochee, j1, j2) => {
  partie.squares[caseCochee] = partie.joueurEnCours;
  const vainqueur = calculateWinner(partie.squares);
  if (vainqueur) {
    partie.vainqueur = vainqueur;
    partie.joueurEnCours = null;
  } else if (partie.squares.filter(c => c === null).length === 0) {
    partie.vainqueur = null;
    partie.joueurEnCours = null;
    partie.egalite = true;
  } else {
    partie.joueurEnCours =
      partie.joueurEnCours.toLowerCase() === j1.toLowerCase()
        ? j2.toLowerCase()
        : j1.toLowerCase();
  }
  parties = [...parties.filter(p => !matchPartieJoueurs(p, j1, j2)), partie];
};

const updateScoreJoueurs = partie => {
  if (partie.vainqueur) {
    // joueurs = [
    //   ...joueurs.filter(j => !(j.nom === partie.j1 || j.nom === partie.j2)),
    //   ...joueurs
    //     .filter(j => j.nom === partie.j1 || j.nom === partie.j2)
    //     .map(j => (j.score = j.score + 1 || 1))
    // ];
  }
};

const supprimerPartiesTerminee = (j1, j2) => {
  const partieEnCours = parties.filter(p => matchPartieJoueurs(p, j1, j2));
  if (
    partieEnCours[0] &&
    (partieEnCours[0].vainqueur != null || partieEnCours[0].egalite)
  ) {
    updateScoreJoueurs(partieEnCours[0]);
    parties = parties.filter(
      p => !(p.j1 === partieEnCours[0].j1 && p.j2 === partieEnCours[0].j2)
    );
  }
};

const trouverPartieACharger = (j1, j2, nouvellePartie) => {
  const partieEnCours = parties.filter(p => matchPartieJoueurs(p, j1, j2));
  let partieACharger;
  if (partieEnCours.length === 1) {
    partieACharger = partieEnCours[0];
  } else {
    partieACharger = nouvellePartie;
    console.log('ajout nouvelle partie');
    parties.push(partieACharger);
  }
  return partieACharger;
};

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('nouveau joueur', function(nomJoueur) {
    console.log('nouveau joueur: ' + nomJoueur);
    if (
      joueurs.filter(j => j.nom.toLowerCase() === nomJoueur.toLowerCase())
        .length === 0
    ) {
      joueurs.push({ id: socket.id, nom: nomJoueur, online: true });
    } else {
      joueurs = [
        ...joueurs.filter(j => j.nom.toLowerCase() !== nomJoueur.toLowerCase()),
        { id: socket.id, nom: nomJoueur, online: true }
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
      joueurEnCours: Math.random() > 0.5 ? msg.j1 : msg.j2,
      vainqueur: null
    };
    supprimerPartiesTerminee(msg.j1, msg.j2);
    const partieACharger = trouverPartieACharger(
      msg.j1,
      msg.j2,
      nouvellePartie
    );
    envoyerNotification(msg.j1, msg.j2, partieACharger);
  });

  socket.on('case cochee', function(data) {
    const { j1, j2, caseCochee } = data;
    console.log('case cochée ', j1, j2, caseCochee);
    const partie = trouverPartie(j1, j2);
    if (partie) {
      updatePartie(partie, caseCochee, j1, j2);
      envoyerNotification(j1, j2, partie);
    }
  });

  socket.on('deconnexion', function() {
    console.log('user deconnexion');
    joueurs = joueurs.map(j => {
      if (j.id === socket.id) {
        return { ...j, online: false };
      } else {
        return j;
      }
    });
    io.emit('listeJoueurs', joueurs);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
    joueurs = joueurs.map(j => {
      if (j.id === socket.id) {
        return { ...j, online: false };
      } else {
        return j;
      }
    });
    io.emit('listeJoueurs', joueurs);
  });
});

http.listen(4000, function() {
  console.log('listening on *:4000');
});

app.get('/parties', function(req, res) {
  res.send(parties);
});
