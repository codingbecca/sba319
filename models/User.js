import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//mongoose automatically creates indexes on fields that are set to be unique, so this code is redundant
// userSchema.index({username: 1});
// userSchema.index({email: 1});



export default mongoose.model("User", userSchema);