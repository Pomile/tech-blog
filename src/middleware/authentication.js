class Authentication {
    /**
     * @description Verify authentication
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async verify(req, res, next) {
        const token = req.headers.authorization || req.headers.Authorization || req.headers.token
        || req.headers['x-access-token'] || req.query.token || req.body.token;
        if (!token) throw new ErrorHandler("Unauthorized", 401);
        const jwtToken = token.split(" ")[1];
        const payload = await jwt.verify(jwtToken, process.env.TOKEN_SECRET_KEY);
        if(!payload) throw new ErrorHandler("Unauthorized", 401);
        try {
            req.payload = payload;
            req.token = token;
            req.auth = payload;
            return next();
        } catch (err) {
            return res.status(401).json({ succes: false, message: err.message });
        }
    }
}