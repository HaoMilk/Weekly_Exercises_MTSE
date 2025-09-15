import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import styles from "./Home.module.css";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/home")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage({ message: "Không lấy được dữ liệu" }));
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeCard}>
        <h1 className={styles.homeTitle}>
          {message?.message || "Chào mừng bạn!"}
        </h1>
        <p className={styles.homeSubtitle}>
          Đây là trang chính của ứng dụng, hãy khám phá các tính năng ở menu.
        </p>
      </div>
    </div>
  );
}
