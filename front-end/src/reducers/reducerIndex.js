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
import createCommentReducer from './commentReducer/createCommentReducer';
import getMyCommunityModReducer from './communityReducers/getMyCommunityModReducer';
import getMyCommunityModUserReqReducer from './communityReducers/getCommunityModUserReqReducer';
import bulkRequestAcceptReducer from './communityReducers/bulkRequestAcceptReducer';
import getMyCommunityModMemReducer from './communityReducers/getCommunityModMemReducer';
import upvotePostReducer from './postReducers/upVotePostReducer';
import downVotePostReducer from './postReducers/downVotePostReducer';
import upvoteCommentReducer from './commentReducer/upvoteCommentReducer';
import downVoteCommentReducer from './commentReducer/downVoteCommentReducer';

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
    createCommentReducer: createCommentReducer,
    getMyCommunityModReducer: getMyCommunityModReducer,
    getMyCommunityModUserReqReducer: getMyCommunityModUserReqReducer,
    bulkRequestAcceptReducer: bulkRequestAcceptReducer,
    getMyCommunityModMemReducer: getMyCommunityModMemReducer,
    upvotePostReducer: upvotePostReducer,
    downVotePostReducer: downVotePostReducer,
    downVoteCommentReducer: downVoteCommentReducer,
    upvoteCommentReducer: upvoteCommentReducer

})


export default rootReducer