import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import './App.css';
import Meals from './containers/Meals';
import Menu from './containers/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  appBackground: {
    minHeight: '100vh',
    backgroundColor: 'var(--main-bg-color)',
  },
  app : {
    margin: '8px',
  }
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appBackground}>
        <div className={classes.app}>
          <div className={classes.root}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>header ?</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}><Meals /></Paper>
              </Grid>
              <Menu />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.loginState;
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(App);