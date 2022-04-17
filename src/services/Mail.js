import Mail from '../config/mail'
class MailSender {
  static sendWelcome({email, firstName}) {
    Mail._sendEmail(
        {
          email,
          subject: "Welcome to Tech Blog!",
          template: "welcome",
          params: {
            firstName: firstName
          }
        },
        (err, data) => {
          if (err) console.log(err);
        }
      );
  }
  static _verifyEmail({email, token }) {
    const url = process.env.FRONTEND_BASE_URL + "/email-verification/" + token;
    Mail._sendEmail(
        {
          email,
          subject: "Account confirmation",
          template: "email-confirmation",
          params: {
            url
          }
        },
        (err, data) => {
          if (err) console.log(err);
        }
      );
  }
}

export default MailSender;
