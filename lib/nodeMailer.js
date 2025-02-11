import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const loadTemplate = (email, data) => {
  const filePath = path.join(process.cwd(), './view', `${email}.html`);
  const source = fs.readFileSync(filePath, 'utf8');
  const template = handlebars.compile(source);
  return template(data);
};

export const sendMail = async (data) => {
  try {
    if (!process.env.EMAIL || !process.env.PASS) {
      throw new Error("Missing EMAIL or PASS environment variables");
    }

    const htmlContent = loadTemplate('email', data);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: data.email,
      subject: data.subject,
      text: data.text,
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.info("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};
