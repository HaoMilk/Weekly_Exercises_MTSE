import nodemailer from "nodemailer";

// Check if email configuration is available
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

const transporter = isEmailConfigured ? nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}) : null;

export const sendPasswordResetEmail = async (email, resetToken) => {
  // If email is not configured, log the reset link for development
  if (!isEmailConfigured) {
    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    console.log("=".repeat(80));
    console.log("📧 EMAIL NOT CONFIGURED - RESET PASSWORD LINK:");
    console.log(`Email: ${email}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log("=".repeat(80));
    return true;
  }

  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Đặt lại mật khẩu - Password Reset",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Đặt lại mật khẩu</h2>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
        <p>Nhấp vào liên kết bên dưới để đặt lại mật khẩu:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Đặt lại mật khẩu
          </a>
        </div>
        <p>Liên kết này sẽ hết hạn sau 15 phút.</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          Nếu liên kết không hoạt động, hãy sao chép và dán URL này vào trình duyệt:<br>
          <a href="${resetUrl}">${resetUrl}</a>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("EMAIL_SEND_FAILED");
  }
};
