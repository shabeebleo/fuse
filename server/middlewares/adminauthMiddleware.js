import jwt from "jsonwebtoken";
import  asyncHandler  from 'express-async-handler'


const adminProtect = asyncHandler(async (req, res, next) => {
    console.log(req.headers,"headers",req.body,"admin protect body");
    let adminToken
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            adminToken = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(adminToken, process.env.JWT_SECRET)
        console.log(decoded,"decoded")
           
            next()
        } catch (error) {
            console.log(error, "kkkk");
            res.status(401)
            throw new Error('not Authorization')
        }
    }
    if (!adminToken) {
        res.status(401)
        throw new Error('not Authorization,no adminToken')
    }
})

export default adminProtect 