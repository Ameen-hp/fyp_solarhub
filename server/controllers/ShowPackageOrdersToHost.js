const PackageOrder = require('../models/PackageOrderSave');
const sendConfirmationEmail = require('../utils/sendEmail'); // Path to your email sending function

// Controller to fetch all customer orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await PackageOrder.find();  // Fetch all orders
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Controller to delete a customer order and send a confirmation email
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await PackageOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete the order from the database
    await PackageOrder.findByIdAndDelete(orderId);

    // Send confirmation email
    await sendConfirmationEmail(order.email, order.packageName);

    res.status(200).json({ message: 'Order deleted successfully and confirmation email sent' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
};

// Controller to confirm an order and send confirmation email
const confirmOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await PackageOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Change order status to confirmed
    order.status = 'confirmed';
    await order.save();

    // Send confirmation email to the user
    await sendConfirmationEmail(order.email, order.packageName);

    res.status(200).json({ message: 'Order confirmed and confirmation email sent' });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ message: 'Failed to confirm order' });
  }
};

module.exports = {
  getAllOrders,
  deleteOrder,
  confirmOrder,
};
