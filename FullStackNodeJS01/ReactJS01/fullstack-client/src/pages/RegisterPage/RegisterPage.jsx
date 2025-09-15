import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Đăng ký thành công, hãy đăng nhập!");
      navigate("/login");
    } catch (err) {
      message.error(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <Card className={styles.registerCard}>
        <h2 className={styles.registerTitle}>Đăng ký</h2>
        <Form layout="vertical" onFinish={onFinish} className={styles.registerForm}>
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Nhập tên" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Nhập email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Nhập mật khẩu" }]}>
            <Input.Password />
          </Form.Item>
          <div className={styles.registerButton}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
