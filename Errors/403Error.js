const enterNameError = (req,res) => {
    return res.status(403).json({
        message: "Please enter name!"
    });
} 
const enterEmailError = (req,res) => {
    return res.status(403).json({
        message: "Please enter email!"
    });
} 
const enterPasswordError = (req,res) => {
    return res.status(403).json({
        message: "Please enter password!"
    });
} 
const passwordLengthError = (req,res) => {
    return res.status(403).json({
        message: "Password has been 8+ characters"
    });
}
module.exports = {
    enterEmailError,
    enterNameError,
    enterPasswordError,
    passwordLengthError
}