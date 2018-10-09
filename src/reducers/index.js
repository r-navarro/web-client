import { combineReducers } from 'redux'
import meal from './mealReducer'
import loginState from './loginReducer'
import fetchReducer from './fetchReducer'

const reducer = combineReducers({
  meal,
  loginState,
  fetchReducer,
})

export default reducer
