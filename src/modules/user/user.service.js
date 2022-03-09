import { User } from "./user.model";

class UserService {

    /**
     * @description Create a user
     * @param {object} data
     * @returns {object}
     */

    static async createUser (data) {
        let user = await User.findOne({ email: data.email });
        if(!user) return { msg: 'User already exists' }
        user = await User.create(data);
        if(!user) console.log('Something went wrong')
        return user;
    }
}
export default UserService
