import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    carMake: String!
    carModel: String!
    email: String!
    picturePath: String!
    friends: [String]
    location: String
    occupation: String
    viewedProfile: Int
    impressions: Int
  }

  type Message {
    id: ID!
    content: String!
    sender: User!
    recipient: User!
    createdAt: String!  # Add the createdAt field here
  }

  type Query {
    getMessages(conversationId: ID!): [Message]
    getUsers: [User]
  }

  type Mutation {
    sendMessage(senderId: ID!, recipientId: ID!, content: String!): Message
  }
`;

export default typeDefs;
