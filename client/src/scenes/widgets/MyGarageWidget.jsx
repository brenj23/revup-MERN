import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery, Button, TextField, IconButton } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { setGarage } from "state";
import CarWidget from "./CarWidget";
import WidgetWrapper from "components/WidgetWrapper";

const MyGarageWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const garage = useSelector((state) => state.garage);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [loading, setLoading] = useState(true);
  const [newCar, setNewCar] = useState({
    carMake: "",
    carModel: "",
    description: "",
    picture: null,
  });

  const fetchGarage = async () => {
    const response = await fetch(`http://localhost:3001/garage`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setGarage({ garage: data }));
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewCar((prevCar) => ({ ...prevCar, picture: e.target.files[0] }));
  };

  const handleAddCar = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("carMake", newCar.carMake);
    formData.append("carModel", newCar.carModel);
    formData.append("description", newCar.description);
    if (newCar.picture) {
      formData.append("picture", newCar.picture);
    }

    const response = await fetch("http://localhost:3001/garage/add", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await response.json();
    dispatch(setGarage({ garage: [...garage, data] }));
    setNewCar({ carMake: "", carModel: "", description: "", picture: null });
  };

  const handleDeleteCar = async (carId) => {
    await fetch(`http://localhost:3001/garage/delete/${carId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setGarage({ garage: garage.filter((car) => car._id !== carId) }));
  };

  useEffect(() => {
    fetchGarage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!Array.isArray(garage)) {
    return <Typography>Error: Garage data is not an array.</Typography>;
  }

  return (
    <WidgetWrapper>
      <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} textAlign="center">
        My Garage
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem" alignItems="center">
        <TextField
          label="Car Make"
          name="carMake"
          value={newCar.carMake}
          onChange={handleInputChange}
        />
        <TextField
          label="Car Model"
          name="carModel"
          value={newCar.carModel}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          name="description"
          value={newCar.description}
          onChange={handleInputChange}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleAddCar}>
          Add Car
        </Button>
      </Box>
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1.5rem"
        justifyContent="center"
        mt="2rem"
      >
        {garage.map(({ _id, carMake, carModel, description, picturePath }) => (
          <Box key={_id} position="relative">
            <CarWidget
              carMake={carMake}
              carModel={carModel}
              description={description}
              picturePath={picturePath}
            />
            <IconButton
              onClick={() => handleDeleteCar(_id)}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <DeleteOutlined />
            </IconButton>
          </Box>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default MyGarageWidget;
