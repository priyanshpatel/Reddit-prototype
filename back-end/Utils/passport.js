const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
require("dotenv").config();

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      const { _id } = jwtPayload;
      kafka.make_request(
        "reddit-auth-topic",
        { path: "user-auth", body: _id },
        function (err, results) {
          console.log('err ', err);
          console.log('result ', results);
          if (err) {
            console.log(err);
            return callback(err.data, false);
          } else {
            console.log("********* passport auth!!! ******");
            return callback(null, true);
          }
        }
      );
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
