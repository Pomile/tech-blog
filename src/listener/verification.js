import { Token } from "../modules/auth/token.model";
import MailSender from "../services/Mail";

export const saveVerificationToken = ({ type, token, email}) => {
    Token.create({ type, email, token })
    setTimeout(() =>  MailSender._verifyEmail({ token, email }), 3000 )
   
};

export const removeVerificationTokens = (filter) => {
    Token.deleteMany(filter)
};
