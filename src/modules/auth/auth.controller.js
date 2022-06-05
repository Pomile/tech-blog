import { validateResult } from "../../common/validateResult";
import AuthService from "./auth.service";
const { FRONTEND_BASE_URL } = process.env;
class AuthController{

    /**
     * @description User sign up
     * @param {object} req 
     * @param {object} res 
     */
    static async signUp (req, res) {
        validateResult(req, res);
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
        validateResult(req, res);
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
        validateResult(req, res);
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
        validateResult(req, res);
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
        validateResult(req, res);
        const token = req.body.token;
        const message = await AuthService.verifyPasswordResetToken(token);
        return res.status(200).json({
            success: true,
            message
        })
    }

    /**
     * @description Reset Password
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async resetPassword(req, res) {
        validateResult(req, res);
        const tok = req.body.token;
        const password = req.body.password;
        const message = await AuthService.resetPassword(tok, password);
        return res.status(200).json({
            success: true,
            message
        })
    }

    static async getGoogleOAuthUrl(req, res) {
        const url = AuthService.getGoogleOAuthUrl();
        return res.status(200).json({
            success: true,
            data: {
                google: { authorize_url: url }
            }
        })
    }

    static async getFacebookOAuthUrl(req, res) {
        const url = AuthService.getFacebookOAuthUrl();
        return res.status(200).json({
            success: true,
            data: {
                facebook: { authorize_url: url }
            }
        })
    }

    static async googleOAuthCallback(req, res) {
        const { code } = req.query;
        const data = await AuthService.googleOAuthCallback(code);
        return res.redirect(FRONTEND_BASE_URL+`/login?token=${data.token}&fullname=${data.fullname}&email=${data.email}`)
    }

    static async facebookOAuthCallback(req, res) {
        const { code } = req.query;
        console.log(code);
        const data = await AuthService.facebookOAuthCallback(code);
        return res.redirect(FRONTEND_BASE_URL+`/login?token=${data.token}&fullname=${data.fullname}&email=${data.email}`)
    }

}

export default AuthController;