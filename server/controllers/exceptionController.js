const Exception = require('../models/ExceptionModel');

// @desc    Get all exceptions
// @route   GET /api/exceptions
// @access  Private (will be later)
const getExceptions = async (req, res) => {
  try {
    const exceptions = await Exception.find({}); // Find all
    res.status(200).json(exceptions);
  } catch (error) {
    console.error(`Error getting exceptions: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new exception
// @route   POST /api/exceptions
// @access  Private (will be later)
const createException = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Please provide all required fields (title, description)');
    }

    const exception = new Exception({
      title,
      description,
      status,
      // user: req.user.id // We will add auth later
    });

    const createdException = await exception.save();
    res.status(201).json(createdException);
  } catch (error) {
    console.error(`Error creating exception: ${error.message}`);
    res.status(400).json({ message: error.message || 'Server Error' });
  }
};

module.exports = {
  getExceptions,
  createException,
};
