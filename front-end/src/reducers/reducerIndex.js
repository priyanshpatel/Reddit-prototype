import { combineReducers } from 'redux';
import loginReducer from './userReducers/loginReducer';
import SignUpReducer from './userReducers/signupReducer';

var rootReducer = combineReducers({
    SignUpReducer: SignUpReducer,
    loginReducer: loginReducer,
})


export default rootReducer
