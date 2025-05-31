const Order = require('../models/cutomerOrderComp');

exports.createOrder = async (req, res) => {
  try {
    const { name, email, address, phone, paymentMethod } = req.body;

    const newOrder = new Order({
      customerName: name,
      customerEmail: email,
      customerAddress: address,
      customerPhone: phone,
      paymentMethod: paymentMethod,
    });

    await newOrder.save();

    res.status(200).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Error placing order. Please try again later.' });
  }
};
