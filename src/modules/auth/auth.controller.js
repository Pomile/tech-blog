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
            success: true,
            message: 'signed up successfully',
            user
        })
    }

    /**
     * @description User sign up
     * @param {object} req 
     * @param {object} res 
     */
     static async login (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'ValidationException', errors: errors.array() });
        }
        const cred = req.body;
        const data = await AuthService.login(cred);
        return res.status(200).json({
            success: true,
            data
        })
    }

}

export default AuthController;