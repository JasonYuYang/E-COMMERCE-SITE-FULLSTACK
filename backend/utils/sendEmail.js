const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const pug = require('pug');

module.exports = class sendEmail {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'PRODUCTION') {
      // Sendgrid
      return nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey: process.env.SENDGRID_API_KEY,
          tls: {
            rejectUnauthorized: false,
          },
        })
      );
    }

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../config/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'ShopIT Password Recovery');
  }
};
