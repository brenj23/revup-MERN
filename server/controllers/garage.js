import Garage from "../models/Garage.js";

// Add a car to the garage
export const addCar = async (req, res) => {
  try {
    const { userId, carMake, carModel, description, picture } = req.body;
    const newCar = new Garage({
      userId,
      carMake,
      carModel,
      description,
      picturePath: picture ? `public/assets/${picture.name}` : "",
    });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all cars in the garage
export const getGarage = async (req, res) => {
  try {
    const garage = await Garage.find({ userId: req.user.id });
    res.status(200).json(garage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a car from the garage
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Garage.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await car.delete();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
