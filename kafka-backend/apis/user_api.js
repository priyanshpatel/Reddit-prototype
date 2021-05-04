import Post from '../models/PostsModel';

const bcrypt = require('bcrypt');
const configuration = require('../config/config');
const UserModel = require('../models/UsersModel');
const CommunityModel = require('../models/communityModel');
const { uniqueNamesGenerator, names } = require('unique-names-generator');
const aleaRNGFactory = require('number-generator/lib/aleaRNGFactory');
const { uInt32 } = aleaRNGFactory(10);
const ObjectId = require('mongodb').ObjectID;
import { populateVotesAndCommentsOfPosts } from './community_api';

const config = {
    dictionaries: [names],
};

export async function registerUser(message, callback) {
    let response = {};
    let err = {};
    console.log('Inside register user post Request');
    let user = message.body.user;
    console.log('User Creation ', JSON.stringify(user));
    try {
        const storedUser = await getUserById(user.email);

        if (storedUser) {
            err.status = 400;
            err.data = 'UserId already exists';
            return callback(err, null);
        } else {
            user = await insertUser(user);
        }
    } catch (error) {
        err.status = 500;
        err.data = {
            code: error.code,
            msg:
                'Unable to create user. Please check application logs for more detail.',
        };
        return callback(err, null);
    }

    response.status = 200;
    response.data = user;
    return callback(null, response);
}

export async function loginUser(message, callback) {
    let response = {};
    let err = {};
    console.log('Inside login user post Request');
    let user = message.body.user;
    console.log('User Login ', JSON.stringify(user));
    const storedUser = await getUserById(user.email);
    if (storedUser !== null) {
        if (await matchPassword(user.password, storedUser.password)) {
            response.status = 200;
            user._id = storedUser._id;
            response.data = user;
            return callback(null, response);
        } else {
            err.status = 401;
            err.data = {
                msg: 'Password mismatch',
            };
            return callback(err, null);
        }
    } else {
        err.status = 400;
        err.data = {
            msg: 'The account does not exist',
        };
        return callback(err, null);
    }
}

export async function editUser(message, callback) {
    console.log('MESSAGEBODY[][][][][][][][][][][][][][][][');
    console.log(message.body);
    console.log('MESSAGEFile[][][][][][][][][][][][][][][][');
    console.log(message.file);
    let response = {};
    let err = {};
    console.log('Inside edit user post Request');
    let user = message.body;
    console.log('Edit User ', JSON.stringify(user));
    const storedUser = await UserModel.findOne({ _id: user.userId });
    try {
        if (user.name !== undefined) {
            storedUser.name = user.name;
        }
        if (user.password !== undefined) {
            storedUser.password = await hashPassword(user.password);
        }
        if (user.gender !== undefined) {
            storedUser.gender = user.gender;
        }
        if (user.description !== undefined) {
            storedUser.description = user.description;
        }
        if (message.file !== undefined) {
            storedUser.avatar = message.file.location;
            user.uploadedProfileImage = message.file.location;
        }
        if (user.uploadedProfileImage !== undefined) {
            storedUser.avatar = user.uploadedProfileImage;
        }
        if (user.location !== undefined) {
            storedUser.location = user.location;
        }
        if (user.topics !== undefined) {
            const topics = user.topics.split(',');
            storedUser.topics = topics;
            user.topics = topics;
        }
        if (user.email !== undefined) {
            storedUser.email = user.email;
        }
        await storedUser.save();
        response.status = 200;
        response.data = user;
        return callback(null, response);
    } catch (error) {
        console.log(error);
        err.status = 400;
        err.data = {
            code: error.code,
            msg: 'Email ID already exist',
        };
        return callback(err, null);
    }
}

export async function getUserById(userId) {
    console.log('Inside get user by Id', userId);
    const user = await UserModel.findOne({ email: userId });
    console.log('user response  ', JSON.stringify(user));
    return user;
}

export async function getUserByObjId(message, callback) {
    let response = {};
    let error = {};
    console.log('Inside get user by Object ID');
    try {
        const user = await UserModel.findOne({ _id: message.body.userId });
        console.log('user response  ', JSON.stringify(user));
        if (user !== null) {
            response.status = 200;
            response.data = user;
            return callback(null, response);
        } else {
            error.status = 400;
            error.data = { msg: 'Invalid Object Id.' };
            return callback(error, null);
        }
    } catch (err) {
        error.status = 400;
        error.data = { msg: 'Invalid Object Id.' };
        return callback(error, null);
    }
}

async function insertUser(user) {
    console.log('Inside insert User');
    user.password = await hashPassword(user.password);
    user.handle = uniqueNamesGenerator(config) + uInt32().toString().slice(0, 3);
    var user = new UserModel(user);
    return await user.save();
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
    return hashedPassword;
}

export async function matchPassword(newPassword, storedEncryptedPassword) {
    // updated
    console.log('Inside match password');
    console.log(
        'password1' + newPassword + ' password2 ' + storedEncryptedPassword
    );
    const isSame = await bcrypt.compare(newPassword, storedEncryptedPassword); // updated
    console.log('In matchPassword' + isSame); // updated
    return isSame;
}

export const getUsersOfMyCommunity = async (req, callback) => {
    const pageSize =
        req.query.pageSize || configuration.defaultPageSizeCommunityModeration;
    const pageNumber = req.query.pageNumber;
    const searchKeyword = req.query.searchKeyword;
    const community_id = req.params.community_id;
    const communityJoinStatus = req.query.userType;
    // find the community
    const community = await CommunityModel.findById(community_id);
    if (
        !community ||
        !ObjectId(community.creator).equals(ObjectId(req.user._id))
    ) {
        callback(null, {
            errorMessage: ['Select a valid community'],
            success: false,
        });
    } else {
        // Initialize a  variable to set the paginated response
        let paginatedResponse = null;

        // Find the array of userIds who has been searched by the creator
        const users = community.members
            .filter(
                (membership) => membership.communityJoinStatus === communityJoinStatus
            )
            .map((membership) => membership._id);

        const customLabels = {
            totalDocs: 'numberOfUsers',
            docs: 'users',
            limit: 'pageSize',
            page: 'pageNumber',
        };

        const paginationOptions = {
            page: pageNumber,
            limit: pageSize,
            customLabels,
            select: {
                name: 1,
                handle: 1,
                avatar: 1,
                email: 1,
                _id: 1,
            },
        };

        if (searchKeyword) {
            // Send Paginated response with search keyword
            paginatedResponse = await UserModel.paginate(
                {
                    $and: [
                        { _id: { $in: users } },
                        { name: { $regex: searchKeyword + '.*' } },
                    ],
                },
                paginationOptions
            );
        } else {
            // Send Paginated response without search keyword
            paginatedResponse = await UserModel.paginate(
                {
                    _id: { $in: users },
                },
                paginationOptions
            );
        }
        callback(null, { ...paginatedResponse, success: true });
    }
};

export async function getCommunityAndPosts(message, callback) {
    let response = {};
    let err = {};

    let userId = message.userId;
    console.log('Inside get community and posts kafka backend', userId);

    try {
        const result = await getAggregatedPostsAndCommunity(userId, message.options);
        response.status = 200;
        response.data = result;
        return callback(null, response);
    } catch (error) {
        console.log("Error x ", error);
        err.code = error.code;
        err.data =
            'Unable to successfully get the communities posts. Please check the log for more details.';
        return callback(err, null);
    }
}

async function getAggregatedPostsAndCommunity(userId, options) {
    const newOptions = Object.assign(
        {
            pageIndex: 1,
            pageSize: 2,
            sortBy: 'createdAt',
            sortOrder: 'desc',
            searchKeyword: '.*',
        },
        options
    );
    const communityInfos = await CommunityModel.find({
        members: { $elemMatch: { _id: userId, communityJoinStatus: 'JOINED' } },
    });

    console.log('Community user is part of', communityInfos);

    const id = communityInfos.map((g) => ObjectId(g.id));

    const posts = Post.aggregate([
        {
            $match: {
                $and: [
                    {
                        community: { $in: id },
                    },
                    {
                        $or: [
                            {
                                title: { $regex: newOptions.searchKeyword }
                            },
                            {
                                description: { $regex: newOptions.searchKeyword }
                            }
                        ]
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy',
            },
        },
        {
            $lookup: {
                from: 'communities',
                localField: 'community',
                foreignField: '_id',
                as: 'community',
            },
        },
        {
            $addFields: {
                createdBy: { $arrayElemAt: ['$createdBy', 0] },
                community: { $arrayElemAt: ['$community', 0] },
            },
        },
        {
            $addFields: {
                numberOfUsers: { $size: '$community.members' },
            },
        },
    ]);

    console.log('New options ', JSON.stringify(newOptions));
    const sortBy = newOptions.sortBy;
    const sortOrder = newOptions.sortOrder;
    const sort = {};
    sort[`${sortBy}`] = sortOrder == 'desc' ? -1 : 1;
    const paginatedPosts = await Post.aggregatePaginate(posts, {
        page: newOptions.pageIndex,
        limit: newOptions.pageSize,
        sort,
    });

    console.log('paginated posts ', paginatedPosts);
    const finalPosts = await populateVotesAndCommentsOfPosts(paginatedPosts.docs, userId, 0 /* Keeping the order same since sorting is already done above. */);
    paginatedPosts.docs = finalPosts;
    return paginatedPosts;
}
