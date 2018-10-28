import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#2196F3', 0.15),
    '&:hover': {
      backgroundColor: fade('#2196F3', 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});


class MealsSearch extends React.Component {

  componentDidMount() {
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = event => {
    const { searchMeals } = this.props;
    const search = event.target.value;
    if(search.length > 2) {
      searchMeals(search);
    }
  }

  render() {
    const { meals, classes } = this.props;
    const displayableMeals = meals.content || []
    return (
      <div>
        <div className="">
          <h3>Meals</h3>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.handleSearch}
            />
          </div>
          {<ul className="">
            {displayableMeals.map((meal) => {
              const mealTab = [];
              mealTab.push(<li key={meal.name}>{`${meal.name} : ${meal.score}`}</li>);
              return mealTab
            }
            )}
          </ul>}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    meals: state.fetchReducer.meals || [],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchMeals: (name) => dispatch(fetchData('meals', `meals/search?name=${name}`, 'GET')),
  }
}

const MealsSearchConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(MealsSearch)

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(MealsSearchConnect);
