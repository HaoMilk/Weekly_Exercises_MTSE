import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true },
    address:   { type: String, default: "" },
    phoneNumber:{ type: String, default: "" },
    gender:    { type: String, enum: ["Male", "Female", "Other"], default: "Other" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
