const UserModel = require('../models/UsersModel');
const CommunityModel = require("../models/CommunityModel");

export async function getUserProfileDetails(message, callback) {
    let response = {};
    console.log("Inside get user profile details get Request");
    console.log("Get User Profile ", JSON.stringify(message.body));
    const user = await UserModel.findOne({ _id: message.body.userId }, { name: 1, avatar: 1 })
    const userCommunities = await CommunityModel.find(
        { members: { $elemMatch: { _id: message.body.userId, communityJoinStatus: "JOINED" } } },
        { communityName: 1, description: 1, communityAvatar: 1, communityCover: 1 }
    )
    const result = {
        user,
        userCommunities
    }
    response.status = 200;
    response.data = result;
    return callback(null, response);
}
