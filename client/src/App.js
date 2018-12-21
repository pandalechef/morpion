import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from './components/main';
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// import io from 'socket.io-client';
// import Plateau from './components/plateau';
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = { value: '', messages: [] };
//   }
//   componentDidMount() {
//     this.socket = io('http://localhost:4000/');
//     this.socket.on('chat message', msg =>
//       this.setState({ messages: this.state.messages.concat(msg) })
//     );
//   }

//   handleChange(e) {
//     this.setState({ value: e.target.value });
//   }

//   handleClick(e) {
//     this.socket.emit('chat message', this.state.value);
//     this.setState({ value: '' });
//     e.preventDefault();
//   }
//   render() {
//     return (
//       <div className="App">
//         <Plateau />
//         <ul id="messages">
//           {this.state.messages.map((msg, id) => (
//             <li key={id}>{msg}</li>
//           ))}
//         </ul>
//         <form action="">
//           <input
//             id="m"
//             value={this.state.value}
//             onChange={this.handleChange}
//             autoComplete="off"
//           />
//           <button onClick={this.handleClick}>Send</button>
//         </form>
//       </div>
//     );
//   }
// }

const App = () => (
  <Router>
    <Provider store={store}>
      <Main />
    </Provider>
  </Router>
);
export default App;
