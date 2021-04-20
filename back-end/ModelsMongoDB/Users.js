const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
  },
  gender: {
    type: String,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
  },
  location: {
    type: Object,
  },
  topics: {
    type: Array,
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('user', usersSchema);
