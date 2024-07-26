import mongoose from "mongoose";

const GarageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  carMake: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  picturePath: {
    type: String,
    required: false,
  },
});

const Garage = mongoose.model("Garage", GarageSchema);
export default Garage;
