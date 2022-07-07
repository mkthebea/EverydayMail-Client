import { React, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { LaptopOutlined, NotificationOutlined, UserOutlined, RightOutlined, LeftOutlined, MailFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu } from "antd";
import "./App.css";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./components/Dashboard/Dashboard";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ScanningPage from "./components/ScanningPage/ScanningPage";
import SettingPage from "./components/SettingPage/SettingPage";
import Accounts from "./components/Accounts/Accounts";
import DetailPage from "./components/DetailPage/DetailPage";
import axios from "axios";

const { Header, Content, Sider } = Layout;

const App = () => {
  // 계정 리스트 메뉴 오픈 관리
  const [menuOpen, setMenuOpen] = useState(false);
  const fetchMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  // 계정 리스트 get
  const [accountsList, setAccountsList] = useState([]);
  const fetchAccountsList = async () => {
    const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/accounts");
    setAccountsList(response.data.accounts);
  };
  useEffect(() => {
    fetchAccountsList();
  }, []);

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        {/* top bar */}
        <Header className="header" style={{ padding: "0px", display: "flex", flexDirection: "row" }}>
          <div style={{ backgroundColor: "green", width: "100%", paddingLeft: "15px", color: "white", fontSize: "20px" }}>
            <Link to="/" style={{ color: "white" }}>
              <MailFilled />
              &nbsp;&nbsp;&nbsp;EveryDay-Mail
            </Link>
          </div>
          <Menu theme="light" style={{ width: "100%", paddingRight: "50px", backgroundColor: "green", color: "white", flexDirection: "row-reverse", border: "0px" }} mode="horizontal">
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="setting">
              <Link to="/setting" style={{ color: "white" }}>
                Setting
              </Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register" style={{ color: "white" }}>
                Register
              </Link>
            </Menu.Item>
            <Menu.Item key="logout">Logout</Menu.Item>
          </Menu>
        </Header>

        <Layout>
          {/* 계정 리스트 */}
          {menuOpen ? (
            <div style={{ display: "flex", flexDirection: "column", backgroundColor: "white" }}>
              <div style={{ display: "flex", justifyContent: "right", height: "50px", alignItems: "center" }}>
                <Button type="primary" ghost="true" icon={<LeftOutlined />} onClick={fetchMenuOpen} style={{ borderColor: "transparent" }} />
              </div>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                  }}
                >
                  {accountsList.map((account) => {
                    return (
                      <Menu.Item key={account}>
                        <LaptopOutlined />
                        {/* <DetailPage account={account} /> */}
                        <Link to={`/detail?account=${account}`}> {account}</Link>
                      </Menu.Item>
                    );
                  })}
                </Menu>
              </Sider>
            </div>
          ) : (
            <div style={{ position: "absolute", padding: "10px 10px 10px 5px" }}>
              <Button type="ghost" icon={<RightOutlined />} onClick={fetchMenuOpen} style={{ borderColor: "transparent" }}>
                메일 리스트 열기
              </Button>
            </div>
          )}

          {/* 페이지 내용 */}
          <Layout
            style={{
              padding: "50px 10px 10px 10px",
              backgroundColor: "rgb(0, 128, 0,0.1)",
            }}
          >
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {/* 라우팅 */}
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/scanning" element={<ScanningPage />} />
                <Route path="/setting" element={<SettingPage />} />
                <Route path="/detail" element={<DetailPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
