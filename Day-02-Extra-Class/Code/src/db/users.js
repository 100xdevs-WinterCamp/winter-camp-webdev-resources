import mongoose from "./mongoose.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
});

export const User = mongoose.model("User", userSchema);
