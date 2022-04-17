
import ErrorHandler from "../../exception/errorHandler";
import { User } from "../user/user.model";
import { Token } from "./token.model";
import { generateToken } from '../../helper/token'
import { genHash } from "../../helper/util";
import event from "../../helper/event";
import MailSender from "../../services/Mail";

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
    if(token){
        await User.updateOne(
            { email: token.email }, 
            { isVerified: true }
        );
        event.fire('remove:email-verification-token', { email, type: 'email-verification'});
    }
   }
}
export default AuthService
