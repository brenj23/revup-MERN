import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { setShowroom } from "state";
import CarWidget from "./CarWidget";
import WidgetWrapper from "components/WidgetWrapper";

const ShowroomWidget = () => {
  const dispatch = useDispatch();
  const showroom = useSelector((state) => state.showroom);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [loading, setLoading] = useState(true);

  const fetchShowroom = async () => {
    const response = await fetch(`http://localhost:3001/showroom`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setShowroom({ showroom: data }));
    setLoading(false);
  };

  useEffect(() => {
    fetchShowroom();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!Array.isArray(showroom)) {
    return <Typography>Error: Showroom data is not an array.</Typography>;
  }

  return (
    <WidgetWrapper>
      <Typography
        fontWeight="500"
        variant="h5"
        sx={{ mb: "1.5rem" }}
        textAlign="center"
      >
        Showroom
      </Typography>
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1.5rem"
        justifyContent="center"
      >
        {showroom.map(
          ({
            _id,
            carMake,
            carModel,
            description,
            picturePath,
          }) => (
            <CarWidget
              key={_id}
              carMake={carMake}
              carModel={carModel}
              description={description}
              picturePath={picturePath}
            />
          )
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default ShowroomWidget;
