const Feedback = require('../models/feedback');

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
};

const postFeedback = async (req, res) => {
  const { user, feedback } = req.body;

  if (!user || !feedback) {
    return res.status(400).json({ message: 'User and feedback are required.' });
  }

  try {
    const newFeedback = new Feedback({ user, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.', newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};

module.exports = {
  getAllFeedbacks,
  postFeedback
};
