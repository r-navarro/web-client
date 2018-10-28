import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Redirect } from 'react-router-dom'
import history from './History'
import App from './App'
import Login from './components/Login';
import Logout from './components/Logout';

const Root = ({ store }) => ( 
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/" component={App} />
      </div>
    </Router>
  </Provider>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('logged') ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
    }
  />
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root