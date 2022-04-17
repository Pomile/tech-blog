import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';
import path from 'path';

/**
 * SMTP_USERNAME
 * SMTP_PORT
 * SMTP_PASSWORD
 */
class Mail {
  static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: false,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  static _sendEmail = (options, cb) => {
    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: path.join(__dirname, "../views"),
          layoutsDir: path.join(__dirname, "../views"),
          defaultLayout: ""
        },
        viewPath: path.join(__dirname, "../views")
      })
    );
    const attachments = options.attachments
      ? [{ ...options.attachments }]
      : null;

    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      template: options.template,
      context: {
        ...options.params
      },
      attachments
    };
    this.transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return cb(err, null);
      }
      return cb(null, data);
    });
  };
}

export default Mail;
