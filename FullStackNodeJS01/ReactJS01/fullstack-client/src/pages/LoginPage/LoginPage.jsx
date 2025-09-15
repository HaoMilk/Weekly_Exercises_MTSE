import { useState, useContext } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "../../utils/axiosInstance.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("/users/login", values);
      login(res.data.data);
      message.success("Đăng nhập thành công!");
      navigate("/home");
    } catch (err) {
      message.error(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Card className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Đăng nhập</h2>
        <Form layout="vertical" onFinish={onFinish} className={styles.loginForm}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Nhập email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Nhập mật khẩu" }]}>
            <Input.Password />
          </Form.Item>
          <div className={styles.loginButton}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </div>
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
