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
  creator: { type: String, required: true },
  members: [{ _id: { type: Schema.Types.ObjectId, ref: 'users' }, communityJoinStatus: { type: String } }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = mongoose.model('community', communitySchema);
