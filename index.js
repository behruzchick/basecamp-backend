const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { signIn, signUp } = require('./Controllers/authController');
const { deleteUser, editUser,authMe } = require('./Controllers/userController');
const { auth } = require('./chekAuth.js');
const {createThread,getAllThreads,deleteThread,editThread,addMessage,editThreadMessage,deleteThreadMessage,getAllThreadMessage} = require('./Controllers/ThController');
const { createPost, getAllPosts,editPost,deletePost , addMember, getAllMembers,deleteMember,setAdmin,unsetAdmin,SendMessage,getAllMessages,getPost,editMessage, deleteMessage} = require('./Controllers/PostController');
const cors = require('cors')
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({
        message: "Hello"
    });
});

app.use(cors());
app.use(express.json());


app.post('/auth/login', signIn);
app.post('/auth/register', signUp)
app.get('/auth/me',auth,authMe)

app.post('/post/create', auth, createPost);
app.get('/post/getOne/:id',auth,getPost);
app.post('/post/addMember/:id',auth,addMember);
app.get('/post/members/:id',auth,getAllMembers)
app.post('/post/deleteMember/:id/:memberId',auth,deleteMember);
app.post('/post/setAdmin/:id/:memberId/:userid',auth,setAdmin);
app.post('/post/unSetAdmin/:id/:memberId/:userid',auth,unsetAdmin);
app.get('/posts', auth, getAllPosts);
app.patch('/post/edit/:id',auth,editPost);
app.post('/post/delete/:id',auth,deletePost)


app.post('/user/delete', auth, deleteUser);
app.patch('/user/edit', auth, editUser);


app.post('/message/delete/:id/:messageId',auth,deleteMessage);
app.patch('/message/edit/:id/:messageId',auth,editMessage);
app.post('/post/SendMessage/:id',auth,SendMessage);
app.get('/post/GetALLMessages/:id',auth,getAllMessages);


app.post('/thread/create/:id',auth,createThread);
app.get('/thread/getAllThreads/:id',auth,getAllThreads);
app.post('/thread/chat/addMessage/:id/:thID',auth,addMessage)
app.get('/thread/chat/getAllMessages/:id/:thID',auth,getAllThreadMessage)
app.post('/thread/chat/deleteMessage/:id/:thID/:messageId',auth,deleteThreadMessage)
app.patch('/thread/chat/editMessage/:id/:thID/:messageId',auth,editThreadMessage)
app.post('/thread/delete/:id/:thID',auth,deleteThread);
app.patch('/thread/edit/:id/:thID',auth,editThread);

// Ждем atachment +++!



app.listen(PORT, () => {
    mongoose.connect("mongodb+srv://akbaralievbehruz44:user@cluster0.6tpnz02.mongodb.net/basecamp?retryWrites=true&w=majority")
        .then(() => {
            console.log("DB ok");
        }).catch((e) => {
            console.log(e);
        });
    console.log("http://localhost:5000");
});
