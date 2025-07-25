const JWT = require("jsonwebtoken");
const userModel = require("../models/UserModel")

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(`req.headers.authorization`, req.headers.authorization)
        const decode = JWT.verify(token.replace('Bearer', '').trim(), process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        console.log(error)
    }
}

// admin access 
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access'
            })
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in admin middleware',
            error
        })
    }
}



module.exports = {
    requireSignIn,
    isAdmin
}