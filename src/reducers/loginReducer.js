import { LOGIN, LOGOUT, LOGIN_ERROR } from '../actions'


let initialState = { logged: false, loginError: false, credentials: {} }

const loginState = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, { logged: true, loginError: false })
        case LOGOUT:
            return Object.assign({}, state, { logged: false, loginError: false })
        case LOGIN_ERROR:
            return Object.assign({}, state, { logged: false, loginError: true })
        default:
            return state
    }
}

export default loginState