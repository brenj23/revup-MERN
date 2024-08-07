// /Users/brenbroussard/Desktop/revupApp/server/graphql/schema.js
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Message {
    id: ID!
    content: String!
    sender: User!
    recipient: User!
    createdAt: String!
  }

  type Query {
    getMessages(conversationId: ID!): [Message]
  }

  type Mutation {
    sendMessage(senderId: ID!, recipientId: ID!, content: String!): Message
  }
`;

export default typeDefs;
