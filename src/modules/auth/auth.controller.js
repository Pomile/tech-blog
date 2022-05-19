import { validateResult } from "../../common/validateResult";
import AuthService from "./auth.service";
const { validationResult } = require('express-validator');

class AuthController{

    /**
     * @description User sign up
     * @param {object} req 
     * @param {object} res 
     */
    static async signUp (req, res) {
        validateResult(req);
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
        validateResult(req);
        const cred = req.body;
        const data = await AuthService.login(cred);
        return res.status(200).json({
            success: true,
            data
        })
    }

    /**
     * @description Confirm Email
     * @param {object} req 
     * @param {object} res 
     */
    static async confirmEmail(req, res) {
        validateResult(req);
        const token = req.body.token;
        const message = await AuthService.verifyEmail(token);
        return res.status(200).json({
            success: true,
            message
        })
    }

    /**
     * @description Confirm Email
     * @param {object} req 
     * @param {object} res 
     */
     static async generatePasswordResetToken(req, res) {
        validateResult(req);
        const email = req.body.email;
        const message = await AuthService.generatePasswordResetToken(email);
        return res.status(200).json({
            success: true,
            message
        })
    }

    /**
     * @description Verify Password Token
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async verifyPasswordResetToken(req, res) {
        validateResult(req);
        const token = req.body.token;
        const message = await AuthService.verifyPasswordResetToken(token);
        return res.status(200).json({
            success: true,
            message
        })
    }

}

export default AuthController;