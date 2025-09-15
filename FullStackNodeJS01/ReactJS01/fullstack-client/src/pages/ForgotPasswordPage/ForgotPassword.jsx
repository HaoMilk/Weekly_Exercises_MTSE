import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "../../utils/axiosInstance";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sentInfo, setSentInfo] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("/users/forgot-password", values);
      setSentInfo(res.data.data);
      message.success("Đã gửi liên kết đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư!");
    } catch (err) {
      message.error(err.response?.data?.message || "Gửi yêu cầu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card style={{ width: 400 }}>
        <h2>Quên mật khẩu</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Nhập email" }]}> 
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Gửi liên kết đặt lại
          </Button>
        </Form>
        {sentInfo && (
          <div style={{ marginTop: 16, padding: 16, backgroundColor: "#f6ffed", border: "1px solid #b7eb8f", borderRadius: 6 }}>
            <div style={{ color: "#52c41a", fontWeight: "bold" }}>✓ {sentInfo.message}</div>
            <div style={{ marginTop: 8, color: "#666" }}>
              Vui lòng kiểm tra hộp thư và nhấp vào liên kết để đặt lại mật khẩu.
            </div>
            {sentInfo.resetToken && (
              <div style={{ marginTop: 12, padding: 12, backgroundColor: "#fff7e6", border: "1px solid #ffd591", borderRadius: 4 }}>
                <div style={{ color: "#d46b08", fontWeight: "bold", marginBottom: 8 }}>🔧 Development Mode:</div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: 8 }}>
                  Link đặt lại mật khẩu (hết hạn sau 15 phút):
                </div>
                <div style={{ 
                  backgroundColor: "#f5f5f5", 
                  padding: "8px", 
                  borderRadius: "4px", 
                  fontFamily: "monospace", 
                  fontSize: "11px",
                  wordBreak: "break-all"
                }}>
                  {window.location.origin}/reset-password?token={sentInfo.resetToken}
                </div>
                <div style={{ marginTop: 8, fontSize: "11px", color: "#999" }}>
                  Hết hạn: {new Date(sentInfo.expiresAt).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}


