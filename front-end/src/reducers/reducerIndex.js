import { combineReducers } from 'redux';
import loginReducer from './userReducers/loginReducer';
import SignUpReducer from './userReducers/signupReducer';
import createPostReducer from './postReducers/createPostReducer';

var rootReducer = combineReducers({
    SignUpReducer: SignUpReducer,
    loginReducer: loginReducer,
    createPostReducer: createPostReducer,
})


export default rootReducer
