import nodeMailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../config/index';

const mailer = nodeMailer.createTransport(
  smtpTransport({
    service: config.mail_server.smtp_service,
    host: config.mail_server.smtp_host,
    auth: {
      user: config.mail_server.emailId,
      pass: config.mail_server.password
    }
  })
);

export default mailer;
