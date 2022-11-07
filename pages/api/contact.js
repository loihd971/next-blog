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
      subject: `New message from EvanLoi blog`,
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
            rel="stylesheet"
          />
          <title>Mail of New Submission</title>
        </head>
      
        <body style="margin: 0px; padding: 0px">
          <div
            style="
              padding: 24px;
              width: 100%;
              height: 100%;
              overflow-y: auto;
              max-height: 800px;
              min-height: 500px;
              display: flex;
              flex-direction: column;
              align-items: center;
              background: #ff7e5f;
              background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);
              background: linear-gradient(to right, #feb47b, #ff7e5f);
              font-size: 14px;
              background-repeat: no-repeat;
              background-size: cover;
              font-family: 'Great Vibes', cursive;
            "
          >
            <div class="header-container">
              <p>
                Hello EvanLoi, You've got a new mail from: <b>${name}</b> with email:
                <b>${email}</b>
              </p>
              <p><b>Message:</b></p>
              <p>${message}</p>
              <br />
              <br />
              <hr />
              <p>Regards</p>
              <p><b>${name}</b></p>
              <p><b>${phone}</b></p>
            </div>
          </div>
        </body>
      </html>      
      `,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};
