import Profile from '../../models/Profile/index.js';
import multer from "multer";
import User from '../../models/User/index.js';

export const createUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, name, age, gender, comments } = req.body;

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    const newProfile = new Profile({
      userId,
      firstName,
      lastName,
      email: req.user.email,
      name,
      age,
      gender,
      comments,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);

  } catch (error) {
    res.status(500).send('Error posting User');
    console.log('error', error);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await Profile.findOneAndUpdate({ userId: id }, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).send('Error updating User');
    console.log('error', error);
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfile = await Profile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedProfile });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const isUserFound = await Profile.findOne({ userId: id });

    if (!isUserFound) {
      return res.status(404).send({ message: 'User Not Found' });
    }

    res.status(200).send({ user: isUserFound });

  } catch (error) {
    res.status(500).send({ message: 'Error finding User' });
    console.log('error', error);
  }
};

export const uploadUserFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { profilePic: req.file.filename });

    console.log('File uploaded:', req.file);
    res.status(201).send('Upload Successful');

  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Error Uploading Picture' });
  }
};

export const getUserFile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profilePicUrl = user.profilePic
      ? `${req.protocol}://${req.get('host')}/uploads/${user.profilePic}`
      : null;

    res.status(200).json({
      ...user.toObject(),
      profilePicUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
}