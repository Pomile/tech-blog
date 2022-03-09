import AuthService from "./auth.service";
const { validationResult } = require('express-validator');

class AuthController{

    /**
     * @description User sign up
     * @param {object} req 
     * @param {object} res 
     */
    static async signUp (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'ValidationException', errors: errors.array() });
        }
        const data = req.body;
        const user = await AuthService.signUp(data);
        return res.status(200).json({
            message: 'signed up successfully',
            user
        })
    }

}

export default AuthController;