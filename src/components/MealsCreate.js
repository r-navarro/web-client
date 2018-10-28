import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { showError, getMeals, fetchData } from '../actions';
import TextField from '@material-ui/core/TextField';
import IngredientsInput from './fields/IngredientsInput';
import Rating from './fields/Rating';
import Collapse from '@material-ui/core/Collapse';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

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
    test: {
        color: '#2196F3',
    },
});


class MealCreate extends React.Component {

    constructor(props) {
        super(props);
        this.sendMealClick = this.sendMealClick.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleRecipeInput = this.handleRecipeInput.bind(this);
        this.handleIngredientsInput = this.handleIngredientsInput.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: false,
        };
    }

    sendMealClick() {
        const { createMeal, meal } = this.props;
        console.log(meal);
        createMeal(meal);
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
        meal.score = event;
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    render() {
        const { error, classes } = this.props;
        return (
            <div>
                <div>
                    <Collapse in={this.state.active}>
                        <RemoveCircleOutline onClick={this.toggleClass} className={classes.test}/>
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
                            <button onClick={this.sendMealClick}>Create</button>
                        </div>
                        <div>
                            {error}
                        </div>
                    </Collapse>
                </div>
                <div>
                    <Collapse in={!this.state.active}>
                        <AddCircleOutline onClick={this.toggleClass} className={classes.test} />
                    </Collapse>
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
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMeals: () => dispatch(getMeals()),
        getMealsAndShowError: (meals, error) => {
            dispatch(getMeals(meals));
            dispatch(showError(error));
        },
        doShowError: (error) => dispatch(showError(error)),
        createMeal: (meal) => dispatch(fetchData('','meals', 'post', meal))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(MealCreate);