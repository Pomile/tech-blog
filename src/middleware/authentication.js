import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
class Authentication {
    /**
     * @description Verify authentication
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async verify(req, res, next) {
        // console.log(req)
        const token = req.headers.authorization || req.headers.Authorization || req.headers.token
        || req.headers['x-access-token'] || req.query.token || req.body.token;
        console.log(token);
        
        try {
            if (!token) throw new ErrorHandler("Unauthorized", 401);
            const jwtToken = token.split(" ")[1];
            const payload = await jwt.verify(jwtToken, process.env.APP_SECRET);
            if(!payload) throw new ErrorHandler("Unauthorized", 401);
            req.payload = payload;
            req.token = token;
            req.auth = payload;
            return next();
        } catch (err) {
            return res.status(401).json({ succes: false, message: err.message });
        }
    }
}

export default Authentication;
