const mongoose = require('mongoose');
const { postModel } = require('../models/Post');
const { userModel } = require('../models/User');
const { threadModel } = require('../models/Thread')
const { threadChatModel } = require('../models/ThreadChat');
const { messageModel } = require('../models/Messages');
const {PostnotFound404,ThreadnotFound404,userNotFound404,MessagenotFound404} = require('../Errors/404Error');
const {internalServerError,noAccessError} = require('../Errors/500Error');
const createThread = async (req, res) => {
    try {
        const thread = new threadModel({
            title: req.body.title,
            user: req.userId
        })

        if (!thread) {
            return ThreadnotFound404(req,res);
        }
        const post = await postModel.findById(req.params.id)

        if (!post) {    
            return PostnotFound404(req,res)
        }

        post.threads.push(thread);

        await thread.save();
        await post.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}
const getAllThreads = async (req, res) => {
    try {
            const post = await postModel.findById(req.params.id).populate({
                path: 'threads',
                populate: {
                    path: 'user'
                },
            }).exec();

        res.json(post)
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}

const deleteThread = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            return PostnotFound404(req,res);
        }
        const thread = await threadModel.findByIdAndDelete(req.params.thID);

        if (!thread) {
            return ThreadnotFound404(req,res);
        }

        post.threads.pull(thread);

        await post.save();


        res.json({
            message:"Successful deleted thread!",
            success:true
        })

    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}

const editThread = async(req,res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post){
            return PostnotFound404(req,res);
        }
        if (!(req.userId === "655eee687c81360e7c734653") && (post.user._id.toString() !== req.userId)) {
            return noAccessError(req,res);
        }
        
        const thread = await threadModel.findByIdAndUpdate(req.params.thID, {
            title:req.body.title
        },{
            new:true
        })
        if(req.body.title === ""){
            return res.status(403).json({
                message:"Please enter edit text!"
            })
        }

        if(!thread){
            return ThreadnotFound404(req,res);
        }

        await post.save();

        res.json(thread);
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}

const addMessage = async(req,res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post){
            return PostnotFound404(req,res);
        }
        const thread = await threadModel.findById(req.params.thID);
        if(!thread){
            return ThreadnotFound404(req,res);
        }
        const newMessage = new threadChatModel({
            text:req.body.text,
            user:req.userId
        });

        thread.chat.push(newMessage);

        await newMessage.save();
        await thread.save();
        await post.save();

        res.json(newMessage);

        
    } catch (error) {
        console.log(error);
    }
}

const getAllThreadMessage = async(req,res) => {
    try {

        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found!!"
            });
        }


        const messages = await threadModel.findById(req.params.thID).populate({
            path:'chat',
            populate:{
                path:'user'
            }
        }).exec();

        if(messages.length === 0){
            return MessagenotFound404(req,res)
        }

        res.json(messages)
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}
const editThreadMessage = async (req, res) => {
    try {

        const thread = await threadModel.findById(req.params.thID);

        if(!thread){
            return ThreadnotFound404(req,res);
        }

        const message = await threadChatModel.findByIdAndUpdate(
            {_id:req.params.messageId},
            { text: req.body.message },
            { new: true }
        );

        const post = await postModel.findById(req.params.id);


        if (!message) {
            return MessagenotFound404(req,res)
        }
        
        if (!post) {
            return PostnotFound404(req,res);
        }
        await thread.save();
        await post.save();

        res.json(message);
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}

const deleteThreadMessage = async(req,res) => {
    try {

        const post = await postModel.findById(req.params.id);

        if(!post){
            return PostnotFound404(req,res);
        }

        const thread = await threadModel.findById(req.params.thID);

        if(!thread){
            return ThreadnotFound404(req,res);
        }

        const message = await threadChatModel.findByIdAndDelete(req.params.messageId);

        if (!message) {
            return MessagenotFound404(req,res)
        }
        // await post.save();
        // await thread.save();
        res.json({
            success: true,
            message: "Successfull deleted message"
        })
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}

module.exports = {
    createThread,
    getAllThreads,
    deleteThread,
    editThread,
    addMessage,
    editThreadMessage,
    deleteThreadMessage,
    getAllThreadMessage
}

