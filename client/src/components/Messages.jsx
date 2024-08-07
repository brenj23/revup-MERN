import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { Box, Typography } from '@mui/material';

const Messages = ({ conversationId }) => {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ padding: '1rem', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      {data.getMessages.map((message) => (
        <Box key={message.id} sx={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <Typography variant="body1">
            <strong>{message.sender.firstName}:</strong> {message.content}
          </Typography>
          <Typography variant="caption" sx={{ color: 'gray' }}>
            {new Date(message.createdAt).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Messages;
