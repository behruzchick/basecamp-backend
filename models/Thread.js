const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    chat:[
        {
            type:mongoose.Types.ObjectId,
            ref:'ThChat',
        }
    ],
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
})

const threadModel = mongoose.model('Thread',threadSchema);

module.exports = {
    threadModel
}