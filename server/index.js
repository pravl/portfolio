import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from "express-rate-limit";
import { Resend } from "resend";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Limit to 1 request per minute per IP
const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1, // limit each IP to 1 request per windowMs
  message: "Too many requests, please try again in a minute.",
});

app.post('/api/send-email', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  try {

    const { data, error } = await resend.emails.send({
      from: "Praval onboarding@resend.dev",   // use a verified domain or `onboarding@resend.dev` for test
      to: process.env.EMAIL_USER,               // your personal/professional email
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    res.status(200).json({ message: "Email sent!" });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 