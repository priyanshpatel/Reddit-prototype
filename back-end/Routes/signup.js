const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../ModelsMongoDB/Users');

const router = express.Router();

const encryptionMiddleware = (req, res, next) => {
  bcrypt.genSalt(10, (err1, salt) => {
    bcrypt.hash(req.body.password, salt, (err2, hash) => {
      req.body.password = hash;
      next();
    });
  });
};

const registerUser = async (req, res) => {
  const newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const doc = await newUser.save();
    req.session.user = doc;
    res.status(200);
  } catch (e) {
    res.status(400);
  } finally {
    res.send();
  }
};

router.post('/', encryptionMiddleware, registerUser);

module.exports = router;
