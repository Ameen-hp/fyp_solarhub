const UserQuery = require('../models/userQuery');
const nodemailer = require('nodemailer');

// Gmail transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'muhammudameen45@gmail.com',        // ✅ Your Gmail address
    pass: 'mjgq tjbw nett bmue'             // ✅ App password (not your real Gmail password)
  }
});

// CREATE user query (POST)
exports.createUserQuery = async (req, res) => {
  try {
    const newQuery = new UserQuery(req.body);
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    res.status(500).json({ message: 'Error creating query', error });
  }
};

// READ all user queries (GET)
exports.getAllUserQueries = async (req, res) => {
  try {
    const queries = await UserQuery.find();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching queries', error });
  }
};

// DELETE user query by ID
exports.deleteUserQuery = async (req, res) => {
  try {
    const deleted = await UserQuery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Query not found' });
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting query', error });
  }
};

// CONFIRM query and send email (PUT)
exports.confirmUserQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuery = await UserQuery.findByIdAndUpdate(
      id,
      { confirmed: true },
      { new: true }
    );

    if (!updatedQuery) return res.status(404).json({ message: 'Query not found' });

    // Send email to the user
    const mailOptions = {
      from: 'muhammudameen45@gmail.com',
      to: updatedQuery.email,
      subject: 'Your Query has been Confirmed',
      text: `Hello ${updatedQuery.name},\n\nYour query has been confirmed. We'll get back to you soon.\n\nThanks,\nSolarHub Team`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('❌ Email sending error:', err);
      else console.log('✅ Email sent:', info.response);
    });

    res.json(updatedQuery);
  } catch (error) {
    res.status(500).json({ message: 'Error confirming query', error });
  }
};
