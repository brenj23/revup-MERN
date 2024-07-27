import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  picturePath: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picturePath: { type: String, required: true },
  friends: { type: Array, default: [] },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
  garage: [CarSchema], // Add garage as an array of CarSchema
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
