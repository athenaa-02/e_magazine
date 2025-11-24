import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});
console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_PASSWORD:", process.env.GMAIL_PASSWORD ? "SET" : "MISSING");
