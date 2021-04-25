// Created by Priyansh Patel on 04/24
const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  parentId: {
    type: mongoose.ObjectId,
  },
  depth: {
    type: Number,
  },
  description: {
    type: String,
  },
  votes: {
    type: Number
  },
  createdBy: {
    type: mongoose.ObjectId,
  }
},
{
  timestamps: true,
  versionKey: false
});

const postSchema = new Schema({
  type: {
    type: String,
    enum : ['text','image','link'],
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  images: [
    {
        type: String,
    },
  ],
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  comments: [commentSchema],
},
{ 
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('post', postSchema);
