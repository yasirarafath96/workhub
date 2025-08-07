import User from "../../models/User/index.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error('Failed to fetch users:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
};