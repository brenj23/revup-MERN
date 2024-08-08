import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages($conversationId: ID!) {
    getMessages(conversationId: $conversationId) {
      id
      content
      sender {
        id
        firstName
        lastName
      }
      recipient {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($senderId: ID!, $recipientId: ID!, $content: String!) {
    sendMessage(senderId: $senderId, recipientId: $recipientId, content: $content) {
      id
      content
      sender {
        id
        firstName
        lastName
      }
      recipient {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      firstName
      lastName
    }
  }
`;