import { Token } from "../modules/auth/token.model";
import MailSender from "../services/Mail";

export const saveVerificationToken = ({ type, token, email}) => {
    Token.create({ type, email, token })
    if(type === 'email-verification') setTimeout(() =>  MailSender._verifyEmail({ token, email }), 3000 );
    if(type === 'password-reset-verification') setTimeout(() => MailSender.sendPasswordResetLink({ token, email }), 3000);
};

export const removeVerificationTokens = async (filter) => {
    console.log(filter)
    await Token.deleteMany(filter)
};
