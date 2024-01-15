const internalServerError = (req,res) => {
    res.status(503).json({
        message:"Internal server error!"
    })
}

const noAccessError = (req,res) => {
    return res.status(500).json({
        message: "No access!!"
    });
}

module.exports = {
    internalServerError,
    noAccessError
}