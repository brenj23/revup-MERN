// /Users/brenbroussard/Desktop/revupApp/server/graphql/resolvers.js
const users = [
    { id: '66b1641aebf87c51c8334ede', firstName: 'Steve', lastName: 'Ralph', email: 'thataaa@gmail.com' },
    { id: '66b1641aebf87c51c8334ee0', firstName: 'Jessica', lastName: 'Bailey', email: 'JessicaBailey@gmail.com' },
    // Add more users
  ];
  
  const messages = [
    { id: '1', content: 'Hello Jessica!', senderId: '66b1641aebf87c51c8334ede', recipientId: '66b1641aebf87c51c8334ee0', createdAt: '2024-08-06T12:00:00Z' },
    // Add more messages
  ];
  
  const resolvers = {
    Query: {
      getMessages: (parent, args) => messages.filter(message => 
        (message.senderId === args.conversationId || message.recipientId === args.conversationId)
      ),
    },
    Mutation: {
      sendMessage: (parent, { senderId, recipientId, content }) => {
        const newMessage = {
          id: String(messages.length + 1),
          content,
          senderId,
          recipientId,
          createdAt: new Date().toISOString(),
        };
        messages.push(newMessage);
        return newMessage;
      },
    },
    Message: {
      sender: (parent) => users.find(user => user.id === parent.senderId),
      recipient: (parent) => users.find(user => user.id === parent.recipientId),
    },
  };
  
  export default resolvers;
  