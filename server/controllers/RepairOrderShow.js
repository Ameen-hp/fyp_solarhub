// controllers/repairController.js
const Repair = require('../models/ReairOrderShow');
const nodemailer = require('nodemailer');

// Submit Repair Form
const submitRepairForm = async (req, res) => {
  try {
    const { name, email, phone, location, problem } = req.body;
    const newRepair = new Repair({ name, email, phone, location, problem });
    await newRepair.save();
    res.status(201).json({ message: 'Repair request saved successfully.' });
  } catch (error) {
    console.error('Error saving repair request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All Repair Orders
const getAllRepairOrders = async (req, res) => {
  try {
    const orders = await Repair.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching repair orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a Repair Order
const deleteRepairOrder = async (req, res) => {
  try {
    const { orderId } = req.body; // orderId is sent in the body
    await Repair.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Repair order deleted successfully.' });
  } catch (error) {
    console.error('Error deleting repair order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Confirm Repair Order and Send Email
// Confirm Repair Order and Send Email
const confirmRepairOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Get orderId from URL params, not body
    const order = await Repair.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'muhammudameen45@gmail.com',
        pass: 'mjgq tjbw nett bmue',  // Consider using an environment variable for security
      },
    });

    const mailOptions = {
      from: 'muhammudameen45@gmail.com',
      to: order.email,
      subject: 'Repair Order Confirmed',
      text: `Dear ${order.name},\n\nYour repair order has been confirmed. Our team will get in touch with you shortly.\n\nRegards,\nSolarHub Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ message: 'Repair order confirmed and email sent.' });
  } catch (error) {
    console.error('Error confirming repair order:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = { submitRepairForm, getAllRepairOrders, deleteRepairOrder, confirmRepairOrder };
