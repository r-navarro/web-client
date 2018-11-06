import { SHOW_ERROR, GET_MEAL } from './../actions'


let initialState = { message: 'Hello', meals: [], error: '', meal: {} }

const meal = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERROR:
            return Object.assign({}, state, { error: action.error })
        case GET_MEAL:
            state = Object.assign({}, state, { meals: action.meals || [] });
            return state
        default:
            return state
    }
}

export default meal