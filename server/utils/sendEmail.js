const nodemailer = require('nodemailer');

const sendEmail = async (to, name) => {
  try {
    // Create reusable transporter object using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail (use a real SMTP service for production)
      auth: {
        user: 'muhammudameen45@gmail.com',      // Your email address
        pass: 'mjgq tjbw nett bmue'             // Your app password
      }
    });

    // Setup email data
    const mailOptions = {
      from: `"SolarHub Team" <muhammudameen45@gmail.com>`,
      to: to,
      subject: 'Order Confirmation - SolarHub',
      text: `Dear ${name},\n\nYour order has been confirmed. Thank you for choosing SolarHub!\n\nRegards,\nSolarHub Team`
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to:', to);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
