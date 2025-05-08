import nodemailer from "nodemailer";

export const handleSendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
