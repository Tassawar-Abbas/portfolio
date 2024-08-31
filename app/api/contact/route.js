// pages/api/sendEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins. Replace '*' with your frontend domain if you want to allow only specific origins.
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Set up your email transport configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME, // Your Gmail address
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD, // Your Gmail password or App password if 2FA is enabled
      },
    });

    // Set up email options
    const mailOptions = {
      from: email, // Sender address
      to: 'tas80066@gmail.com', // List of recipients
      subject: `Contact Form Submission from ${name}`, // Subject line
      text: message, // Plain text body
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
