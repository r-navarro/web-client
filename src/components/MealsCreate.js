import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { sendMeal, showError, getMeals, fetchData } from '../actions';
import TextField from '@material-ui/core/TextField';
import IngredientsInput from './fields/IngredientsInput';
import Rating from './fields/Rating';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: '75%',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class MealCreate extends React.Component {

    constructor(props) {
        super(props);
        this.sendMealClick = this.sendMealClick.bind(this);
        this.meClick = this.meClick.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleRecipeInput = this.handleRecipeInput.bind(this);
        this.handleIngredientsInput = this.handleIngredientsInput.bind(this);
    }

    sendMealClick() {
        const { getMealsAndShowError, meal } = this.props;
        console.log(meal);
    }

    meClick() {
        const { getMe } = this.props;
        getMe();
    }

    handleNameInput = event => {
        const { meal } = this.props;
        meal.name = event.target.value;
    }

    handleRecipeInput = event => {
        const { meal } = this.props;
        meal.recipe = event.target.value;
    }

    handleIngredientsInput = event => {
        const { meal } = this.props;
        meal.ingredients = event.selectedItem;
    }

    handleRatinginput = event => {
        const { meal } = this.props;
        meal.value = event;
    }

    render() {
        const { error, me, classes } = this.props;
        return (
            <div>
                <div>
                    <TextField
                        id="name-input"
                        label="Name"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleNameInput}
                    />
                    <IngredientsInput
                        onChange={this.handleIngredientsInput}
                    />
                    <TextField
                        id="recipe-input"
                        label="Recipe"
                        multiline
                        rowsMax="4"
                        onChange={this.handleRecipeInput}
                        className={classes.textField}
                        margin="normal"
                    />
                    <Rating onChange={this.handleRatinginput} />
                </div >
                <div>
                    <button onClick={this.sendMealClick}>Click</button>
                    <button onClick={this.meClick}>me</button>
                </div>
                <div>
                    {error}
                </div>
                <div>
                    {me.name}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        meal: state.meal.meal,
        meals: state.meal.meals,
        error: state.meal.error,
        me: state.fetchReducer.data
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSendMeal: (meal) => dispatch(sendMeal(meal)),
        getMeals: () => dispatch(getMeals()),
        getMealsAndShowError: (meals, error) => {
            dispatch(getMeals(meals));
            dispatch(showError(error));
        },
        doShowError: (error) => dispatch(showError(error)),
        getMe: () => dispatch(fetchData('me', 'GET'))
    }
}

export default compose(
    withStyles(styles, {
        name: 'Menu',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(MealCreate);