import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "../../utils/axiosInstance";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tokenFromUrl = params.get("token") || "";

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/reset-password", { token: tokenFromUrl, password: values.password });
      message.success("Đặt lại mật khẩu thành công, hãy đăng nhập!");
      navigate("/login");
    } catch (err) {
      message.error(err.response?.data?.message || "Đặt lại mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card style={{ width: 400 }}>
        <h2>Đặt lại mật khẩu</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="password" label="Mật khẩu mới" rules={[{ required: true, message: "Nhập mật khẩu mới" }]}> 
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Xác nhận
          </Button>
        </Form>
      </Card>
    </div>
  );
}


