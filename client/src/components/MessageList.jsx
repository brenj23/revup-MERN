import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { Box, Typography } from '@mui/material';

const MessageList = ({ conversationId }) => {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading messages</p>;

  return (
    <Box>
      {data.getMessages.map((message) => (
        <Box key={message.id} sx={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <Typography variant="body1">
            <strong>{message.sender.firstName} {message.sender.lastName}:</strong> {message.content}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(parseInt(message.createdAt)).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
