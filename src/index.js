import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

// let store = createStore(rootReducer) // this is store

let store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
