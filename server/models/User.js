import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  carMake: { type: String, required: true },
  carModel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picturePath: { type: String, required: true },
  friends: { type: Array, default: [] },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
