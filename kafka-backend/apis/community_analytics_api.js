const CommunityModel = require("../models/communityModel");
const PostsModel = require("../models/PostsModel");
const UserModel = require('../models/UsersModel');

export async function communityAnalytics(message, callback) {
    let response = {};
    console.log("Inside community analytics get Request");
    console.log("Add Message ", JSON.stringify(message.body));
    const communities = await getCommunitiesByCreator(message.body.userId);
    console.log(communities);
    let numberOfPosts = 0;
    /* if (communities.length !== 0) {
        const numberOfUsers = await getNumberOfUsersInCommunity(communities[0]._id);
        console.log(numberOfUsers);
        numberOfPosts = await getNumberOfPostsInCommunity(communities[0]._id);
        console.log(numberOfPosts);
        const mostUpVotedPosts = await getMostUpVotedPost("608f2818a3f92cb7e499c779");
        console.log(mostUpVotedPosts);
        const maxUsersPost = await getUserMaxPost("608f2818a3f92cb7e499c779");
        console.log(maxUsersPost);
        const maxCommunityPost = await getMaxPostCommunity();
        console.log(maxCommunityPost);
    }
    const allMostUpVotedPosts = await getAllMostUpVotedPosts();
    const allUsersWithPosts = await getAllUsersWithPosts();
    const allCommunitiesWithNumberOfPosts = await getAllCommunitiesWithNumberOfPosts();

    const mostUpVotedPostForCommunity = await getMostUpVotedPostForCommunity("608f2818a3f92cb7e499c779", allMostUpVotedPosts);
    console.log(mostUpVotedPostForCommunity);
    const userWhoCreatedMaxPostInCommunity = await getUserWhoCreatedMaxPostInCommunity("608f2818a3f92cb7e499c779", allUsersWithPosts);  
    console.log(userWhoCreatedMaxPostInCommunity);
    const communityWithMaxPosts = await getCommunityWithMaxPosts(allCommunitiesWithNumberOfPosts);
    console.log(communityWithMaxPosts); */

    response.status = 200;
    response.data = numberOfPosts;
    return callback(null, response);
}

async function getCommunitiesByCreator(creatorId) {
    console.log("Inside get communities by creator");
    const communities = await CommunityModel.find({ creator: creatorId })
    return communities;
}

/* async function getNumberOfUsersInCommunity(communityId) {
    console.log("Inside get number of users in community");
    const community = await CommunityModel.findOne({ _id: communityId })
    return community.members.length;
}

async function getNumberOfPostsInCommunity(communityId) {
    console.log("Inside get number posts in community");
    const posts = await PostsModel.find({ community: communityId })
    const numberOfPosts = posts.length;
    return numberOfPosts;
}

async function getMostUpVotedPostForCommunity(communityId, allUpVotedPosts) {
    console.log("Inside get most upvoted post for a community");
    const mostUpVotedPostForCommunity = allUpVotedPosts.find(x => x._id.community.toString() === communityId);
    const postDetails = await PostsModel.findOne({ _id: mostUpVotedPostForCommunity.postId }, { title: 1, description: 1 });
    const mostUpVotedPostWithDetails = {
        postDetails,
        voteCount: mostUpVotedPostForCommunity.voteCount
    }
    return mostUpVotedPostWithDetails;
}

async function getUserWhoCreatedMaxPostInCommunity(communityId, allUsersWithPosts) {
    console.log("Inside get user who created maximum number of post");
    const usersWhoCreatedPostInCommunity = allUsersWithPosts.filter(x => x._id.community.toString() === communityId);
    usersWhoCreatedPostInCommunity.sort(function (a, b) {
        return b.numberOfPost - a.numberOfPost;
    });
    const userDetails = await UserModel.findOne({ _id: usersWhoCreatedPostInCommunity[0]._id.createdBy }, { name: 1, avatar: 1 });
    const usersWhoCreatedMaxPostInCommunity = {
        userDetails,
        numberOfPost: usersWhoCreatedPostInCommunity[0].numberOfPost
    }
    return usersWhoCreatedMaxPostInCommunity;
}

async function getCommunityWithMaxPosts(allCommunitiesWithNumberOfPosts) {
    console.log("Inside get community with maximum number of post");
    allCommunitiesWithNumberOfPosts.sort(function (a, b) {
        return b.numberOfPost - a.numberOfPost;
    });
    const community = await CommunityModel.findOne({ _id: allCommunitiesWithNumberOfPosts[0]._id.community });
    const communityWithMaxPost = {
        community,
        numberOfPost: allCommunitiesWithNumberOfPosts[0].numberOfPost
    }
    return communityWithMaxPost;
}

async function getAllMostUpVotedPosts() {
    console.log("Inside get all most upvoted post");
    const allMostUpVotedPosts = await PostsModel.aggregate([
        {
            $group: {
                _id: {
                    community: "$community",
                },
                postId: { $first: '$_id' },
                voteCount: { $max: "$votes" }
            },
        },
    ]);
    return allMostUpVotedPosts;
}

async function getAllUsersWithPosts(communityId) {
    console.log("Inside get all user who created post and with number of post");
    const allUsersWithPosts = await PostsModel.aggregate([
        {
            $group: {
                _id: {
                    community: "$community",
                    createdBy: "$createdBy"
                },
                numberOfPost: { $sum: 1 }
            },
        },
    ]);
    return allUsersWithPosts;
}

async function getAllCommunitiesWithNumberOfPosts() {
    console.log("Inside get all communities with number of post");
    const allCommunitiesWithNumberOfPosts = await PostsModel.aggregate([
        {
            $group: {
                _id: {
                    community: "$community",
                },
                numberOfPost: { $sum: 1 }
            },
        },
    ])
    return allCommunitiesWithNumberOfPosts;
} */
