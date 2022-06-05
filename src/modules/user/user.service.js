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

    static async updateOrCreateUserFromOAuth (strategy, oauthUserInfo) {
        console.log(oauthUserInfo)
        let exists = false;
        const {
            id,
            given_name,
            family_name,
            picture,
            verified_email,
            email
        } = oauthUserInfo;
        let user = await User.findOne({ email });
        if(user) {
            user = await User.findOneAndUpdate({ email }, { auth: strategy, authId: id, isVerified: verified_email, image: picture }, {new: true});
            exists = true;
         } else {
            user = await User.create({
                authId: id,
                isVerified: true,
                email,
                auth: strategy,
                firstName: given_name,
                lastName: family_name,
                image: picture
            });
         }

        return { user, exists };
    }
}
export default UserService
