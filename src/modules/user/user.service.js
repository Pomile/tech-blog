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

    static async updateUserProfile(data, auth) {
        const profile = await User.updateOne(
            { _id: auth.id }, 
            data
        );
        return profile;
    }

    static async getUserProfile(auth) {
        const profile = await User.findOne({ _id: auth.id })
            .select({ password: 0, __v: 0 });
        return profile;
    }
}
export default UserService
