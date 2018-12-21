import { connect } from 'react-redux';
import Header from '../components/header';

const mapStateToProps = state => ({
  nomJoueur: state.nomJoueur
});

export default connect(mapStateToProps)(Header);
