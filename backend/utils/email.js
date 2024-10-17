import { createTransport } from 'nodemailer';
import { renderFile } from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { htmlToText } from 'html-to-text';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `quiz web app <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    return createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    const templatePath = path.resolve(
      __dirname,
      `../emailTemplates/${template}.ejs`
    );

    const emailHtml = await renderFile(templatePath, {
      name: this.name,
      url: this.url
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: emailHtml,
      text: htmlToText(emailHtml)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the Quiz app  Family!');
  }
  async forgotPassword() {
    await this.send('forgotPassword', 'The link is Available for 10 minutes');
  }
  async passwordResetConfirmation() {
    await this.send('passwordResetConfirmation', 'password Reset Confirmation');
  }
}

export default Email;
