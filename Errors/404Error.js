const PostnotFound404 = (req,res) => {
    res.status(404).json({
        message:"Post not found!"
    })
}
const ThreadnotFound404 = (req,res) => {
    res.status(404).json({
        message:"Thread not found!"
    })
}
const MessagenotFound404 = (req,res) => {
    res.status(404).json({
        message:"Post not found!"
    })
}
const userNotFound404 = (req,res) => {
    res.status(404).json({
        message:"User not found!"
    })
}

module.exports = {
    PostnotFound404,
    ThreadnotFound404,
    userNotFound404,
    MessagenotFound404
}
