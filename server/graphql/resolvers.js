import User from '../models/User.js';
import Message from '../models/Message.js';

const resolvers = {
  Query: {
    getMessages: async (parent, { conversationId }) => {
      return await Message.find({
        $or: [{ senderId: conversationId }, { recipientId: conversationId }],
      }).populate('senderId').populate('recipientId');
    },
    getUsers: async () => {
      return await User.find();
    },
  },
  Mutation: {
    sendMessage: async (parent, { senderId, recipientId, content }) => {
      // Validate inputs
      if (!senderId || !recipientId || !content) {
        console.error("Validation Error: All fields are required");
        throw new Error("All fields are required");
      }

      console.log("Received input parameters:", { senderId, recipientId, content });

      const sender = await User.findById(senderId);
      const recipient = await User.findById(recipientId);

      if (!sender || !recipient) {
        console.error("Validation Error: Sender or recipient not found");
        throw new Error("Sender or recipient not found");
      }

      const newMessage = new Message({
        content,
        senderId,
        recipientId,
      });

      await newMessage.save();
      const populatedMessage = await Message.findById(newMessage._id).populate('senderId').populate('recipientId');
      console.log("Message successfully saved and populated:", populatedMessage);
      return populatedMessage;
    },
  },
  Message: {
    sender: async (parent) => {
      if (parent.senderId instanceof User) {
        return parent.senderId;
      }
      return await User.findById(parent.senderId);
    },
    recipient: async (parent) => {
      if (parent.recipientId instanceof User) {
        return parent.recipientId;
      }
      return await User.findById(parent.recipientId);
    },
  },
};

export default resolvers;
