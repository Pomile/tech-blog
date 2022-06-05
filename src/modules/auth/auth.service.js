
import ErrorHandler from "../../exception/errorHandler";
import { User } from "../user/user.model";
import { Token } from "./token.model";
import { generateToken } from '../../helper/token'
import { genHash } from "../../helper/util";
import event from "../../helper/event";
import MailSender from "../../services/Mail";
import { getGoogleOAuthUrl, getGoogleUser , getFacebookOAuthUrl, getFacebookUser} from "../../helper/oauth";
import UserService from "../user/user.service";
const { FRONTEND_BASE_URL } = process.env;

class AuthService {

    /**
     * @description Create a user
     * @param {object} data
     * @returns {object}
     */

    static async signUp (data) {
        let user = await User.findOne({ email: data.email });
        if(user) throw new ErrorHandler('user already exists', 404)
        user = await User.create(data);
        const token = generateToken({
            id: user._id,
            fullname: user.fullname,
            email: user.email
        });
        const hash = genHash(data.email);
        MailSender.sendWelcome({ firstName: user.firstName, email: user.email });
        event.fire('save:email-verification-token', { 
            token: hash,
            type: "email-verification",
            email: user.email 
        })
        
        return {
            fullname: user.fullname,
            email: user.email,
            token
        }
    }

   static async login (data) {
    const user = await User.findOne({ email: data.email });
    if(!user) throw new ErrorHandler('incorrect email or password', 401)
    await user.comparePassword(data.password, user.password, (err, result) => {
        if(err) throw new ErrorHandler('incorrect email or password', 401)
        return result
    });
    const token = generateToken({
        id: user._id,
        fullname: user.fullname,
        email: user.email
    })
    return {
        fullname: user.fullname,
        email: user.email,
        token: `Bearer ${token}`
    }
   }

   static async verifyEmail(hash){
    const token = await Token.findOne({ token: hash });
    console.log(token);
    if(token){
        await User.updateOne(
            { email: token.email }, 
            { isVerified: true }
        );
        // console.log(token);
        event.fire('remove:email-verification-token', { email: token.email, type: 'email-verification'});
        return 'Email confirmed successfully'
    } else {
        throw new ErrorHandler('Email verification token expired', 404)
    }

   }

   static async generatePasswordResetToken(email) {

    let user = await User.findOne({ email });
    if(!user) throw new ErrorHandler("Email not found", 404);
    const token = genHash(email);
    event.fire('save:password-reset-token', { 
        token,
        type: "password-reset-verification",
        email, 
    });
    return 'Password reset link sent';
   }
   /**
    * Verify Password Reset Token
    * @param {*} hash 
    * @returns 
    */
   static async verifyPasswordResetToken(hash){
    const token = await Token.findOne({ token: hash });
    if(token){
        return 'Email confirmed successfully'
    } else {
        throw new ErrorHandler('Email verification token expired', 404)
    }
   }

   /**
    * Verify Password Reset Token
    * @param {*} hash 
    * @returns 
    */
    static async resetPassword(hash, password){
        console.log(hash);
        const token = await Token.findOne({ token: hash });
        console.log("token: " + token);
        if(token){
            await User.findOneAndUpdate({ email: token.email }, { password }, {new: true})
            event.fire('remove:password-reset-token', { email: token.email, type: 'password-reset-verification'});
            return 'Password changed successfully'
        } else {
            throw new ErrorHandler('Invalid token', 400)
        }
    }

    /**
     * Generate Google OAuth URL
     */

    static getGoogleOAuthUrl() {
        const authorizationUrl = getGoogleOAuthUrl();
        return authorizationUrl
    }

    /**
     * Generate Facebook OAuth URL
     */

     static getFacebookOAuthUrl() {
        const authorizationUrl = getFacebookOAuthUrl();
        return authorizationUrl
    }

    static async googleOAuthCallback(code) {
        let data;
        const oauthUserInfo = await getGoogleUser({ code });
        if(oauthUserInfo) {
            data = await UserService.updateOrCreateUserFromOAuth('google', oauthUserInfo);
            const token = generateToken({
                id: data.user._id,
                fullname: data.user.fullname,
                email: data.user.email
            });
            return {
                fullname: data.user.fullname,
                email: data.user.email,
                token
            }
        } else {
            throw new ErrorHandler("UnAuthorized. Something went wrong", 401)
        }
    }

    static async facebookOAuthCallback(code) {
        let data;
        const oauthUserInfo = await getFacebookUser({ code });
        if(oauthUserInfo) {
            data = await UserService.updateOrCreateUserFromOAuth('facebook', oauthUserInfo);
            console.log(data);
            const token = generateToken({
                id: data.user._id,
                fullname: data.user.fullname,
                email: data.user.email
            });
            return {
                fullname: data.user.fullname,
                email: data.user.email,
                token
            }
        } else {
            throw new ErrorHandler("UnAuthorized. Something went wrong", 401)
        }
    }
}
export default AuthService
