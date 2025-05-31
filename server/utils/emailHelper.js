const nodemailer = require('nodemailer');

// Directly store email credentials in the code (not recommended for production)
const EMAIL_USER = 'muhammudameen45@gmail.com';  // Your email address
const EMAIL_PASS = 'UpperCase123';               // Your email password

const sendConfirmationEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Order Confirmed',
    html: `
      <h3>Dear ${name},</h3>
      <p>Your order has been confirmed.</p>
      <p>Thank you for shopping with us!</p>
      <p><strong>SolarHub</strong></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent successfully.');
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
    throw new Error('Email sending failed.');
  }
};

module.exports = { sendConfirmationEmail };
