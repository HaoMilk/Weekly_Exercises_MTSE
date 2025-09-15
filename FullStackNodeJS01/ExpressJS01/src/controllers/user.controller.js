import { registerUser, loginUser, requestPasswordReset, resetPassword } from "../services/user.service.js";

export async function register(req, res) {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const result = await requestPasswordReset(email);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const { token, password } = req.body;
    const result = await resetPassword({ token, password });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
