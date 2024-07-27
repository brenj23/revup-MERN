import User from '../models/User.js';

// Add a friend
export const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }
    if (!friend.friends.includes(userId)) {
      friend.friends.push(userId);
      await friend.save();
    }

    const friends = await User.find({ _id: { $in: user.friends } });

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a friend
export const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    const friends = await User.find({ _id: { $in: user.friends } });

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get friends list
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friends = await User.find({ _id: { $in: user.friends } });

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
