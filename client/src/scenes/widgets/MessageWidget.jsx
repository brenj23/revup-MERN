import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../../graphql/queries';
import { Box, Typography } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';

const MessageWidget = () => {
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { conversationId: user._id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading messages</p>;

  return (
    <WidgetWrapper>
      <Typography variant="h5" gutterBottom>
        Your Messages
      </Typography>
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
    </WidgetWrapper>
  );
};

export default MessageWidget;
