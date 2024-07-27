import express from 'express';
import { addFriend, removeFriend, getFriends } from '../controllers/friends.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Add a friend
router.patch('/:userId/:friendId', verifyToken, addFriend);

// Remove a friend
router.delete('/:userId/:friendId', verifyToken, removeFriend);

// Get friends list
router.get('/:userId/friends', verifyToken, getFriends);

export default router;
