import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.module.css";
import "antd/dist/antd.min.css";
import { ScanOutlined, LaptopOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, PlusCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, MailFilled } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import DashBoard from "./components/Dashboard/Dashboard";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ScanningPage from "./components/ScanningPage/ScanningPage";
import SettingPage from "./components/SettingPage/SettingPage";
import Accounts from "./components/Accounts/Accounts";
import DetailPage from "./components/DetailPage/DetailPage";
import SignupPage from "./components/SignupPage/SignupPage";

import Logo from "./logo.png";

const { Content, Sider } = Layout;
// const SubMenu = Menu.SubMenu;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  // 계정 리스트 get
  // const [accountsList, setAccountsList] = useState([]);
  // const fetchAccountsList = async () => {
  //   const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/accounts");
  //   setAccountsList(response.data.accounts);
  // };
  // useEffect(() => {
  //   fetchAccountsList();
  // }, []);
  const accountsList = ["abcd@naver.com", "1234@daum.net", "qwer@google.com"];

  // 로그인 상태 가져오기
  // const [login, setLogin] = useState(false);
  // const fetchLogin = async () => {
  //   const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/login");
  //   setLogin(response.data.isLogin);
  //   console.log("로그인 상태: ", login);
  // };
  const [login, setLogin] = useState(true);
  const fetchLogin = () => {
    setLogin(!login);
    console.log("로그인 상태: ", login);
  };

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="logo" style={{ marginTop: "10vh", height: "20%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Link to="/" style={{ color: "green", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "15px", fontWeight: "bolder" }}>
              {/* <MailFilled /> */}
              <img src={Logo} style={{ width: "80%" }} />
              {collapsed ? <div></div> : <div>EveryDay-Mail</div>}
            </Link>
          </div>
          <Menu theme="light" mode="inline" inlineCollapsed={collapsed} style={{ marginTop: "10vh" }}>
            {/* <Menu.Item key="accounts" icon={<MailOutlined />}> */}
            <SubMenu title="Accounts" icon={<MailOutlined />}>
              {accountsList.map((account) => {
                return (
                  <Menu.Item key={account}>
                    <LaptopOutlined />
                    <Link to={`/detail?account=${account}`}> {account}</Link>{" "}
                  </Menu.Item>
                );
              })}
            </SubMenu>
            {/* </Menu.Item> */}
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
              <Menu.Item key="login" icon={<LogoutOutlined />} onClick={fetchLogin}>
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item key="login" icon={<LoginOutlined />} onClick={fetchLogin}>
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              minHeight: 280,
              backgroundColor: "rgb(144, 238, 144, 0.3)",
            }}
          >
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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/scanning" element={<ScanningPage />} />
              <Route path="/setting" element={<SettingPage />} />
              <Route path="/detail" element={<DetailPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
