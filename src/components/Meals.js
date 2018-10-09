import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { MealService } from '../services/MealService'
import { getMeals } from '../actions'

class Meals extends React.Component {

  componentDidMount() {
    this.initMeal();
  }

  initMeal() {
    const { getMeals } = this.props;
    const mealService = new MealService();
    mealService.getMeals().then(data => { getMeals(data) });
  }


  render() {
    const { meals } = this.props;
    return (
      <div>
        <div className="chatroom">
          <h3>Meals</h3>
          {<ul className="chats">
            {meals.map((meal) =>
              <li>{meal}</li>
            )}
          </ul>}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    meals: state.meal.meals,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMeals: (meals) => dispatch(getMeals(meals)),
  }
}

const MealsConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Meals)


Meals.propTypes = {
  meals: PropTypes.array.isRequired
}

export default MealsConnect
