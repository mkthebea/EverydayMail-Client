import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import styles from "./App.module.css";
import "antd/dist/antd.min.css";
import { ScanOutlined, LaptopOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, PlusCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, MailFilled } from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import DashBoard from "./components/Dashboard/Dashboard";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ScanningPage from "./components/ScanningPage/ScanningPage";
import SettingPage from "./components/SettingPage/SettingPage";
import DetailPage from "./components/DetailPage/DetailPage";
import SignupPage from "./components/SignupPage/SignupPage";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import NotFound from "./components/NotFound/NotFound";

import Logo2 from "./Logo2.png";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  axios.defaults.withCredentials = true;

  // 로그인 상태 관리
  const [login, setLogin] = useState(false);

  const logout = async () => {
    const response = await axios.post("/api/logout/");
    if (response.data.success) {
      message.success("로그아웃 완료");
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    } else {
      message.error(response.data.errorMessage);
    }
  };

  // 계정 리스트 get
  const [accountsList, setAccountsList] = useState([]);
  const fetchAccountsList = async () => {
    const response = await axios.get("/api/account/accounts/");
    // console.log("accountsList response: ", response);
    if (response.data.success) {
      setAccountsList(response.data.accountsList);
      setLogin(true); // accountsList 못가져오면 로그인 안된걸로 간주
    }
  };
  useEffect(() => {
    fetchAccountsList();
  }, []);

  return (
    <>
      <Router>
        <Layout style={{ height: "100vh" }} className={styles.font}>
          <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
            <div className="logo" style={{ marginTop: "10vh", height: "20%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Link to="/" style={{ color: "green", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "15px", fontWeight: "bolder" }}>
                <img src={Logo2} style={{ width: "100%" }} />
              </Link>
            </div>
            <Menu theme="light" mode="inline" inlineCollapsed={collapsed} style={{ marginTop: "10vh", zIndex: "100" }}>
              <SubMenu title="Accounts" icon={<MailOutlined />}>
                {accountsList !== [] ? (
                  accountsList.map((account) => {
                    return (
                      <Menu.Item key={account}>
                        <LaptopOutlined />
                        <Link to={`/detail?account=${account}`}> {account}</Link>{" "}
                      </Menu.Item>
                    );
                  })
                ) : (
                  <></>
                )}
              </SubMenu>
              <Menu.Item key="register" icon={<PlusCircleOutlined />}>
                <Link to="/register">Register</Link>
              </Menu.Item>
              <Menu.Item key="scanning" icon={<ScanOutlined />}>
                <Link to="/scanning">Scanning</Link>
              </Menu.Item>
              <Menu.Item key="setting" icon={<SettingOutlined />}>
                <Link to="/setting">Setting</Link>
              </Menu.Item>
              {login ? (
                <Menu.Item key="login" icon={<LogoutOutlined />} onClick={logout}>
                  Logout
                </Menu.Item>
              ) : (
                <Menu.Item key="login" icon={<LoginOutlined />}>
                  <Link to="/login">Login</Link>
                </Menu.Item>
              )}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content>
              <div style={{ fontSize: "20px", padding: "20px 0px 0px 20px", position: "absolute" }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                })}
              </div>
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/register" element={login ? <RegisterPage /> : <NotAuthorized />} />
                <Route path="/scanning" element={login ? <ScanningPage /> : <NotAuthorized />} />
                <Route path="/setting" element={login ? <SettingPage /> : <NotAuthorized />} />
                <Route path="/detail" element={login ? <DetailPage /> : <NotAuthorized />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  );
};

export default App;
