const ChatModel = require('../models/ChatModel');

export async function addMessage(message, callback) {
    let response = {};
    console.log("Inside add message post Request");
    let chatData = message.body;
    console.log("Add Message ", JSON.stringify(chatData));
    let chat = await getChat(chatData.members);
    const chatMessage = {
        from: chatData.message.from,
        content: chatData.message.content,
    }
    if (chat !== null) {
        chat.messages.push(chatMessage);
    } else {
        chat = await new ChatModel();
        chat.members = [...chatData.members];
        chat.messages.push(chatMessage);
    }
    await chat.save();
    const lastMessage = await getLastMessage(chat._id);
    response.status = 200;
    response.data = lastMessage;
    return callback(null, response);
}

export async function getMessages(message, callback) {
    let response = {};
    console.log("Inside get messages get Request");
    const members = message.body.members;
    console.log("Get Message ", JSON.stringify(members));
    const chatDetails = await ChatModel.findOne({ members: { $all: members } }).populate("members", "name avatar");
    response.status = 200;
    response.data = chatDetails;
    return callback(null, response);
}

async function getChat(members) {
    console.log("Inside get chat");
    const chat = await ChatModel.findOne({ members: { $all: members } });
    return chat;
}

async function getLastMessage(chatId) {
    console.log("Inside get last message");
    const chat = await ChatModel.findOne({ _id: chatId }).populate("messages.from", "name avatar");
    const lastMessage = chat.messages[chat.messages.length - 1]
    return lastMessage;
}




