
import ErrorHandler from "../../exception/errorHandler";
import { User } from "../user/user.model";
import { generateToken } from '../../helper/token'

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
        return {
            fullname: user.fullname,
            email: user.email
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
}
export default AuthService
