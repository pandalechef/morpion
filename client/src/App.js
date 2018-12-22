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
const App = () => (
  <Router>
    <Provider store={store}>
      <Main />
    </Provider>
  </Router>
);
export default App;
