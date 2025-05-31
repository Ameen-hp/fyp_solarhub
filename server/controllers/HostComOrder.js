const Order = require('../models/HostCompOrder');
const nodemailer = require('nodemailer');

// Gmail transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'muhammudameen45@gmail.com',  // Your Gmail address
    pass: 'mjgq tjbw nett bmue'      // Your App Password (NOT your Gmail password)
  }
});

// @desc    Get all orders
// @route   GET /api/order/getAllOrders
// @access  Public or Protected (your choice)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error.message);
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
};

// @desc    Confirm order by ID and send email
// @route   POST /api/order/confirmOrder/:orderId
// @access  Admin (assumption)
const confirmOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: 'Confirmed' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Send confirmation email
    const mailOptions = {
      from: 'muhammudameen45@gmail.com',
      to: order.customerEmail,
      subject: 'Order Confirmed',
      text: `Dear ${order.customerName},\n\nYour order has been confirmed.\n\nThank you for shopping with us!\nSolarHub`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('❌ Error sending confirmation email:', err);
        return res.status(500).json({ message: 'Email sending failed', error: err.message });
      }

      console.log('✅ Confirmation email sent:', info.response);

      // Only send the response here after the email is sent successfully
      res.status(200).json({
        message: '✅ Order confirmed and email sent.',
        order,
      });
    });

  } catch (error) {
    console.error('❌ Error confirming order:', error.message);
    res.status(500).json({ message: 'Failed to confirm order.' });
  }
};

// @desc    Delete order by ID
// @route   DELETE /api/order/deleteOrder/:orderId
// @access  Admin (assumption)
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deleted = await Order.findByIdAndDelete(orderId);

    if (!deleted) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: '🗑️ Order deleted successfully.' });
  } catch (error) {
    console.error('❌ Error deleting order:', error.message);
    res.status(500).json({ message: 'Failed to delete order.' });
  }
};

module.exports = {
  getAllOrders,
  confirmOrder,
  deleteOrder,
};
