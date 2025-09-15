import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../config/email.js";

export async function registerUser({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("EMAIL_EXISTS");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return { id: user._id, name: user.name, email: user.email };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("USER_NOT_FOUND");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("INVALID_PASSWORD");

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user: { id: user._id, name: user.name, email: user.email } };
}

export async function requestPasswordReset(email) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("USER_NOT_FOUND");

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = expiresAt;
  await user.save();

  // Send email with reset link
  await sendPasswordResetEmail(email, rawToken);

  return { 
    message: "Reset link sent to email",
    resetToken: rawToken, // Include token for development
    expiresAt: expiresAt
  };
}

export async function resetPassword({ token, password }) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) throw new Error("TOKEN_INVALID_OR_EXPIRED");

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { id: user._id, email: user.email };
}
