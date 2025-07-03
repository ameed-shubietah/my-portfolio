// server.js
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse <form method="POST">
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the two static pages if you host both front & back on one origin
app.use(express.static("public")); // public/contact.html etc.

/**
 * POST /api/contact
 * Sends an email then redirects browser to /thank-you.html
 */
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Configure mail transport (Gmail example – use OAuth2 or App Password)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,      // your Gmail
      pass: process.env.MAIL_PASSWORD,  // app password or OAuth2
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "ameedraqish@gmail.com",        // where you want to receive messages
    subject: "New message from portfolio site",
    text: message,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    // 302 redirect – browser lands on thank-you.html
    res.redirect(303, "/thank-you.html");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong – please try again later.");
  }
});

// Fallback – show 404 for any other route
app.use((req, res) => res.status(404).send("Not found"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
