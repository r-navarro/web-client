import { FETCH_DATA_SUCCESS, IS_LOADING, HAS_ERRORED } from '../actions'

let initialState = { error: '', data: '', isLoading: false }

const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case HAS_ERRORED:
            return Object.assign({}, state, { error: action.hasErrored })
        case FETCH_DATA_SUCCESS:
            return Object.assign({}, state, { data: action.data })
        case IS_LOADING:
            return Object.assign({}, state, { isLoading: action.isLoading })
        default:
            return state
    }
}

export default fetchReducer