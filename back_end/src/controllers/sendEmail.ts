import { handleSendEmail } from "../services/mail";

export const sendEmail = async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res
        .status(400)
        .json({ error: "Missing required fields: to, subject, html" });
    }

    await handleSendEmail(to, subject, html);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};
