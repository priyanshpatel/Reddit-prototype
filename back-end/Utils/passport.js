const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const Users = require("../models/UsersModel");
require("dotenv").config();

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  // TODO:- Kafka Implementation of passport

  // passport.use(
  //   new JwtStrategy(opts, (jwtPayload, callback) => {
  //     const { _id } = jwtPayload;
  //     kafka.make_request(
  //       "reddit-auth-topic",
  //       { path: "user-auth", body: _id },
  //       function (err, results) {
  //         console.log("err ", err);
  //         console.log("result ", results);
  //         if (err) {
  //           console.log(err);
  //           return callback(err.data, false);
  //         } else {
  //           console.log("********* passport auth!!! ******");
  //           return callback(null, true);
  //         }
  //       }
  //     );
  //   })
  // );

  // Without kafka Implementation
  passport.use(
    new JwtStrategy(opts, (decodedPayload, callback) => {
      const user_id = decodedPayload._id;
      Users.findById(user_id, "name email", (error, user) => {
        console.log(user_id);
        if (error) {
          return callback(error, false);
        } else if (user) {
          callback(null, user);
        } else {
          callback(null, false);
        }
      });
    })
  );
}

// Appending the user data in all incoming requests to backend
const checkAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      const error = {
        errorMessage: "Please login to continue",
      };
      return res.status(401).json(error);
    } else {
      req.user = user;
    }
    return next();
  })(req, res, next);
};

exports.auth = auth;
exports.checkAuth = checkAuth;
