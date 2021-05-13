const CommunityModel = require("../models/CommunityModel");
const PostsModel = require("../models/PostsModel");
const UserModel = require('../models/UsersModel');
const ObjectId = require("mongodb").ObjectID;

export async function communityAnalytics(message, callback) {
    let response = {};
    console.log("Inside community analytics get Request");
    console.log("Add Message ", JSON.stringify(message.body));
    const communities = await getCommunitiesByCreator(message.body.userId);
    const numberOfUsers = await getNumberOfUsersInCommunity(communities);
    const allCommunitiesWithPost = await getNumberOfPostsInCommunity(communities);
    const allUpVotedPosts = await getAllMostUpVotedPostsInCommunity();
    console.log(allUpVotedPosts);
    /* const numberOfUsers = await getNumberOfUsersInCommunity("608e0b963ee4659f4a58ca67");
    const numberOfPosts = await getNumberOfPostsInCommunity("6086d5efbf72b94cb61f38b2");
    const allPostForCommunity = await getAllPostsForCommunity("6086d5efbf72b94cb61f38b2");
    const allUsersWhoCreatedPosts = await getUsersWhoCreatedPosts("6086d5efbf72b94cb61f38b2");
    const allCommunitiesWithNumberOfPosts = await getAllCommunitiesWithNumberOfPosts();
    const communityWithMaxPosts = await getCommunityWithMaxPosts(allCommunitiesWithNumberOfPosts);
    console.log(communityWithMaxPosts);
    const result = { numberOfUsers, numberOfPosts, allPostForCommunity, allUsersWhoCreatedPosts } 
     const communities = await getCommunitiesByCreator(message.body.userId);
    console.log(communities);
    const result = await getAnalyticsForAllCommunities(communities);
     if (communities.length !== 0) {
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
    response.data = {numberOfUsers, allCommunitiesWithPost};
    return callback(null, response);
}

async function getCommunitiesByCreator(creatorId) {
    console.log("Inside get communities by creator");
    const communities = await CommunityModel.find({ creator: creatorId })
    return communities;
}

async function getNumberOfUsersInCommunity(communities) {
    console.log("Inside get number of users in a communtiy");
    let communityNames = [];
    let numberOfUsers = [];
    communities.forEach((community) => {
        communityNames.push(community.communityName);
        const communityMembers = community.members.map((user) => {
            if (user.communityJoinStatus == "JOINED") {
                return user
            }
        });
        numberOfUsers.push(communityMembers.length);
    })
    return { communityNames, numberOfUsers };
}

async function getNumberOfPostsInCommunity(communities) {
    console.log("Inside get number of posts in a community");
    const communitiesIds = communities.map(community => ObjectId(community._id));
    console.log(communitiesIds);
    const allCommunitiesWithNumberOfPosts = await PostsModel.aggregate([
        {
            $match: {
                community: { $in: [ObjectId("6089060988d216f724f852ab")] },
            },
        },
        {
            $lookup: {
                from: "communities",
                localField: "community",
                foreignField: "_id",
                as: "communityDetails",
            },
        },
        {
            $addFields: {
                communityDetails: { $arrayElemAt: ["$communityDetails", 0] },
            },
        },
        {
            $group: {
                _id: {
                    community: "$community",
                    communityDetails: "$communityDetails"
                },
                numberOfPost: { $sum: 1 }
            },
        },
    ]);
    let communityNames = [];
    let numberOfPosts = [];
    allCommunitiesWithNumberOfPosts.forEach((communityWithPosts) => {
        communityNames.push(communityWithPosts._id.communityDetails.communityName);
        numberOfPosts.push(communityWithPosts.numberOfPost);
    })
    return {communityNames, numberOfPosts};
}

/* async function getAllMostUpVotedPostsInCommunity() {
    console.log("Inside get all most upvoted post");
    const allMostUpVotedPosts = await PostsModel.aggregate([
        {
            $match: {
                community: { $in: [ObjectId("608f2818a3f92cb7e499c779"), ObjectId("6086d5efbf72b94cb61f38b2")] },
            },
        },
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
} *

/* async function getNumberOfUsersInCommunity(communityId) {
    console.log("Inside get number of users in community");
    const community = await CommunityModel.findOne({ _id: communityId })
    const users = community.members.map((user) => {
        if (user.communityJoinStatus == "JOINED") {
            return user
        }
    });
    return users.length;
}

async function getNumberOfPostsInCommunity(communityId) {
    console.log("Inside get number posts in community");
    const posts = await PostsModel.find({ community: communityId })
    const numberOfPosts = posts.length;
    return numberOfPosts;
}

async function getAllPostsForCommunity(communityId) {
    console.log("Inside get all post for a community");
    const allPosts = await PostsModel.find({ community: communityId }, { description: 1, votes: 1 });
    let allDescription = [];
    let allVotes = [];
    allPosts.forEach((post) => {
        allDescription.push(post.description);
        allVotes.push(post.votes);
    })
    return { allDescription, allVotes };
}

async function getUsersWhoCreatedPosts(communityId) {
    console.log("Inside get all user who created post and with number of post");
    console.log(communityId);
    const allUsersWithPosts = await PostsModel.aggregate([
        {
            $match: {
                community: ObjectId(communityId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "user",
            },
        },
        { $unwind: "$user" },
        {
            $group: {
                _id: {
                    community: "$community",
                    createdBy: "$createdBy",
                    user: "$user"
                },
                numberOfPost: { $sum: 1 }
            },
        },
    ]);
    let allUsers = [];
    let allNumberOfPosts = [];
    allUsersWithPosts.forEach((userWithPost) => {
        allUsers.push(userWithPost._id.user.name);
        allNumberOfPosts.push(userWithPost.numberOfPost);
    })
    return { allUsers, allNumberOfPosts };
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


async function getCommunitiesByCreator(creatorId) {
    console.log("Inside get communities by creator");
    const communities = await CommunityModel.find({ creator: creatorId })
    return communities;
}

async function getAnalyticsForAllCommunities(communities) {
    return Promise.all(communities.map(async (community) => {
        const numberOfUsers = await getNumberOfUsersInCommunity(community._id);
        const numberOfPosts = await getNumberOfPostsInCommunity("6086d5efbf72b94cb61f38b2");
        const allPostForCommunity = await getAllPostsForCommunity("6086d5efbf72b94cb61f38b2");
        return { numberOfUsers, numberOfPosts, allPostForCommunity }
    }));
} */

/* async function getMostUpVotedPostForCommunity(communityId, allUpVotedPosts) {
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
