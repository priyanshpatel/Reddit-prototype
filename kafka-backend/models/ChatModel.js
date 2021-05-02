const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    content: { type: String }
},
    {
        timestamps: true,
        versionKey: false,
    });
const chatSchema = new Schema({
    members: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user'
        }
    ],
    messages: [messageSchema]
},
    {
        timestamps: true,
        versionKey: false,
    });

module.exports = mongoose.model('chat', chatSchema);
