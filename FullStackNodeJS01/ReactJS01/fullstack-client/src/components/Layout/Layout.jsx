import { Layout as AntLayout, Menu, Button, Drawer } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./Layout.module.css";

const { Header, Content } = AntLayout;

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDrawerOpen(false);
  };

  return (
    <AntLayout className={styles.layoutRoot}>
      <Header className={styles.layoutHeader}>
        {/* Nút menu icon (thay dấu 3 chấm) */}
        <MenuOutlined
          className={styles.menuIcon}
          onClick={() => setDrawerOpen(true)}
        />

        <Drawer
          title="Điều hướng"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={() => setDrawerOpen(false)}
          >
            <Menu.Item key="/home">
              <Link to="/home">Trang chủ</Link>
            </Menu.Item>
            {!user && (
              <>
                <Menu.Item key="/login">
                  <Link to="/login">Đăng nhập</Link>
                </Menu.Item>
                <Menu.Item key="/register">
                  <Link to="/register">Đăng ký</Link>
                </Menu.Item>
              </>
            )}
            {user && (
              <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            )}
          </Menu>
        </Drawer>

        <div className={styles.layoutAuthDesktop}>
          {user ? (
            <div className={styles.logoutButton}>
              <Button onClick={handleLogout}>Đăng xuất</Button>
            </div>
          ) : (
            <div className={styles.layoutAuth}>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </div>
          )}
        </div>
      </Header>

      <Content className={styles.layoutContent}>{children}</Content>
    </AntLayout>
  );
}
