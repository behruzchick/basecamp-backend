const mongoose = require('mongoose');

const threadChatSchema = mongoose.Schema({
    text: {
        type: String,
        required:true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true
    },
})

const threadChatModel = mongoose.model('ThChat',threadChatSchema);

module.exports = {
    threadChatModel
}