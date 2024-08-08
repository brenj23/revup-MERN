import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_MESSAGE, GET_MESSAGES, GET_USERS } from '../graphql/queries';

const MessageModal = ({ isOpen, handleClose, senderId }) => {
  const [recipientId, setRecipientId] = useState('');
  const [content, setContent] = useState('');

  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSendMessage = async () => {
    try {
      await sendMessage({
        variables: {
          senderId,
          recipientId,
          content,
        },
        refetchQueries: [{ query: GET_MESSAGES, variables: { conversationId: senderId } }],
      });
      handleClose();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (usersLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading users</p>;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Send a Message
        </Typography>
        <Select
          fullWidth
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          displayEmpty
          margin="dense"
        >
          <MenuItem value="" disabled>
            Select Recipient
          </MenuItem>
          {usersData.getUsers.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="dense"
        />
        <Button onClick={handleSendMessage} variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default MessageModal;
