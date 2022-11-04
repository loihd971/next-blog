import mail from "@sendgrid/mail";
import nodemailer from "nodemailer";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { name, email, message, phone } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "loihd971@gmail.com",
      subject: `Contact form submission from ${name}`,
      html: `<p>Hello Evanloi, You have a new message from:</p><br>
        <p><strong>Email: </strong> ${email}</p><br>
        <p><strong>Message: </strong> ${message}</p><br>
        <p><strong>Phone: </strong> ${phone}</p><br>
      `,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};
