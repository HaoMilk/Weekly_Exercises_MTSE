import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./ProtectedRoute.module.css";

export default function ProtectedRoute({ children }) {
  const { token, loadingAuth } = useContext(AuthContext);

  // Nếu đang check token -> hiện splash loading
  if (loadingAuth) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Đang tải...</p>
      </div>
    );
  }

  if (!token) return <Navigate to="/login" />;

  return children;
}
