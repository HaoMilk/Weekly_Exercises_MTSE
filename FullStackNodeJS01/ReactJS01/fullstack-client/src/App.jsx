import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/HomePage/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import Login from "./pages/LoginPage/LoginPage.jsx";
import Register from "./pages/RegisterPage/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPasswordPage/ResetPassword.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Layout>
  );
}
