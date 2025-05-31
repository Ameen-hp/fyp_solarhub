const PackageOrder = require('../models/PackageOrderSave');

// Controller to handle the package order creation
const createPackageOrder = async (req, res) => {
  const {
    packageId,
    packageName,
    packagePrice,
    fullName,
    email,
    phone,
    address,
    deliveryAddress,
    contactNumber,
    paymentMethod,
  } = req.body;

  try {
    const newOrder = new PackageOrder({
      packageId,
      packageName,
      packagePrice,
      fullName,
      email,
      phone,
      address,
      deliveryAddress,
      contactNumber,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order submitted successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Error saving order. Please try again.' });
  }
};

module.exports = {
  createPackageOrder,
};
