var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var communitySchema = new Schema({
  communityName: { type: String, required: true, unique: true },
  topics: { type: Array },
  description: { type: String, required: true },
  communityAvatar: { type: String, required: true },
  coverPicture: { type: String, required: false },
  // primaryTopic:{type:String, required:true},
  rules: { type: Array },
  creator: { type: Schema.Types.ObjectId, ref: 'user' },
  members: [{ _id: { type: Schema.Types.ObjectId, ref: 'user' }, communityJoinStatus: { type: String } }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = mongoose.model('community', communitySchema);
