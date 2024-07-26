import Showroom from "../models/Showroom.js"; // Ensure you have a Showroom model

export const getShowroom = async (req, res) => {
  try {
    const showroom = await Showroom.find();
    res.status(200).json(showroom);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const enterContest = async (req, res) => {
  try {
    const { carId } = req.params;
    const showroomCar = await Showroom.findById(carId);
    // Implement contest logic here

    res.status(200).json(showroomCar);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
