import dotenv from "dotenv";
import { welcomeTemplate } from "./templates.js";
import { mailTransport } from "./mailTransport.js";

dotenv.config();

const send = (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.GMAIL_USER,
  };

  return mailTransport.sendMail(options);
};

export const registrationWelcome = async (to, name) => {
  const html = welcomeTemplate(name);
  return send(to, "welcome to our company", html);
};
