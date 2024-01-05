const mongoose = require('mongoose');
const { postModel } = require('../models/Post');
const { userModel } = require('../models/User');
const {threadModel} = require('../models/Thread')
const {threadChatModel} = require('../models/ThreadChat');

const createThread = async(req,res) => {
    try {
        const thread =  new threadModel({
            title:req.body.title,
            user:req.userId
        })

        if(!thread){
            return res.status(501).json({
                message: "Cannot create thread!"
            });
        }
        const post = await postModel.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                message: "Post not found!!"
            });
        }

        post.threads.push(thread);

        await thread.save();
        await post.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        return res.status(503).json({
            message: "Internal server error"
        });
    }
}
const getAllThreads = async(req,res) => {
    try {
        const post = await postModel.findById(req.params.id).populate({
            path: 'thread',
            populate: {
                path: 'user',
            },
            options: {
                strictPopulate: false,
            },
        });

        if(threads.length === 0){
            return res.status(404).json({
                message: "Threads not found!"
            });
        }

        res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            message: "Internal server error"
        });
    }
}

module.exports ={
    createThread,
    getAllThreads
}

