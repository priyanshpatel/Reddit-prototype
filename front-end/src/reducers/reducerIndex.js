import { combineReducers } from 'redux';
import loginReducer from './userReducers/loginReducer';
import SignUpReducer from './userReducers/signupReducer';
import userUpdateReducer from './userReducers/userUpdateReducer';
import userGetByIDReducer from './userReducers/getByIDReducer';
import createCommunityReducer from './communityReducers/createCommunityReducer';
import createPostReducer from './postReducers/createPostReducer';
import myCommunitiesReducer from './communityReducers/myCommunitiesReducer';
import getByIDCommunityReducer from './communityReducers/getByIDCommunityReducer';
import getPostByIDReducer from './postReducers/getPostByIDReducer';

var rootReducer = combineReducers({
    SignUpReducer: SignUpReducer,
    loginReducer: loginReducer,
    userUpdateReducer: userUpdateReducer,
    userGetByIDReducer: userGetByIDReducer,
    createCommunityReducer: createCommunityReducer,
    createPostReducer: createPostReducer,
    myCommunitiesReducer: myCommunitiesReducer,
    getByIDCommunityReducer: getByIDCommunityReducer,
    getPostByIDReducer: getPostByIDReducer,

})


export default rootReducer