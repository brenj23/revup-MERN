import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';

const CarWidget = ({ carMake, carModel, description, picturePath }) => {
  const theme = useTheme();

  return (
    <WidgetWrapper>
      <Box
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0,0,0,0.2)"
        overflow="hidden"
        bgcolor={theme.palette.background.alt}
        p="1rem"
        mb="1rem"
        width="100%"
      >
        <Box display="flex" justifyContent="center" mb="1rem">
          <img
            src={`http://localhost:3001/assets/${picturePath}`}
            alt={`${carMake} ${carModel}`}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>
        <Typography
          variant="h6"
          fontWeight="500"
          gutterBottom
          textAlign="center"
        >
          {carMake} {carModel}
        </Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          {description}
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default CarWidget;
