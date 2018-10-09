import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Meals from './containers/Meals'
import Menu from './containers/Menu'

class App extends Component {

  render() {
    return (
      <div>
        <Meals />
        <Menu />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.loginState;
}

export default connect(mapStateToProps)(App)
