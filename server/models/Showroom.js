import mongoose from "mongoose";

const ShowroomSchema = new mongoose.Schema({
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
    required: true,
  },
  picturePath: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: [
    {
      type: new mongoose.Schema(
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          userName: String,
          text: String,
        },
        { timestamps: true }
      ),
    },
  ],
}, { timestamps: true });

const Showroom = mongoose.model("Showroom", ShowroomSchema);
export default Showroom;
