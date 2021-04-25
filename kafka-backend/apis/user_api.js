const bcrypt = require('bcrypt');
const UserModel = require('../models/UsersModel');

export async function registerUser(message, callback) {
    let response = {};
    let err = {};
    console.log("Inside register user post Request");
    let user = message.body.user;
    console.log("User Creation ", JSON.stringify(user));
    try {
        const storedUser = await getUserById(user.email);

        if (storedUser) {
            err.status = 400;
            err.data = "UserId already exists";
            return callback(err, null);
        }else{
            user = await insertUser(user);
        }

    } catch (error) {
        err.status = 500;
        err.data = {
            code: error.code,
            msg: "Unable to create user. Please check application logs for more detail.",
        };
        return callback(err, null);
    }

    response.status = 200;
    response.data = user;
    return callback(null, response);
}

export async function getUserById(userId) {
    console.log("Inside get user by Id", userId);
    const user = await UserModel.findOne({ email: userId });
    console.log("user response  ", JSON.stringify(user));
    return user;
}

export async function getUserByObjId(message, callback) {
    let response = {};
    let error = {};
    console.log("Inside get user by Email ID");
    try {
        const user = await UserModel.findOne({ _id: message });
        console.log("user response  ", JSON.stringify(user));
        response.status = 200;
        response.data = user;
        return callback(null, response);
    }
    catch (err) {
        console.log(err);
        error.code = 500;
        error.data = { code: err.code, msg: 'Unable to get the user by Email Id.' };
        return callback(error, null);
    }
}

async function insertUser(user) {
    console.log("Inside insert User");
    user.password = await hashPassword(user.password);
    var user = new UserModel(user);
    return await user.save();
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword;
}

export async function matchPassword(newPassword, storedEncryptedPassword) { // updated
    console.log("Inside match password");
    console.log("passw1" + newPassword + " password2 " + storedEncryptedPassword);
    const isSame = await bcrypt.compare(newPassword, storedEncryptedPassword) // updated
    console.log(isSame) // updated
    return isSame;

}