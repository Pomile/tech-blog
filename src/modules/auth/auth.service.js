
import ErrorHandler from "../../exception/errorHandler";
import { User } from "../user/user.model";

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
}
export default AuthService
