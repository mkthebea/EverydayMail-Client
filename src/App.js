import React, { useState, useEffect, Component } from "react";
import "antd/dist/antd.css";
import {
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  NotificationOutlined,
  RightOutlined,
  LeftOutlined,
  MailFilled,
} from "@ant-design/icons";
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
import SignupPage from "./components/SignupPage/SignupPage";
import axios from "axios";

const { Header, Content, Sider } = Layout;

// const App = () => {
//   // 계정 리스트 메뉴 오픈 관리
//   const [menuOpen, setMenuOpen] = useState(false);
//   const fetchMenuOpen = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // 계정 리스트 get
//   // const [accountsList, setAccountsList] = useState([]);
//   // const fetchAccountsList = async () => {
//   //   const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/accounts");
//   //   setAccountsList(response.data.accounts);
//   // };
//   // useEffect(() => {
//   //   fetchAccountsList();
//   // }, []);
//   const accountsList = ["abcd@naver.com", "1234@daum.net", "qwer@google.com"];

//   // 로그인 상태 가져오기
//   // const [login, setLogin] = useState(false);
//   // const fetchLogin = async () => {
//   //   const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/login");
//   //   setLogin(response.data.isLogin);
//   //   console.log("로그인 상태: ", login);
//   // };
//   const [login, setLogin] = useState(true);
//   const fetchLogin = () => {
//     setLogin(!login);
//     console.log("로그인 상태: ", login);
//   };

//   return (
//     <Router>
//       <Layout style={{ height: "100vh" }}>
//         {/* top bar */}
//         <Header className="header" style={{ padding: "0px", display: "flex", flexDirection: "row" }}>
//           <div style={{ backgroundColor: "green", width: "100%", paddingLeft: "15px", color: "white", fontSize: "20px" }}>
//             <Link to="/" style={{ color: "white" }}>
//               <MailFilled />
//               &nbsp;&nbsp;&nbsp;EveryDay-Mail
//             </Link>
//           </div>
//           <Menu theme="light" style={{ width: "100%", paddingRight: "50px", backgroundColor: "green", color: "white", flexDirection: "row-reverse", border: "0px" }} mode="horizontal">
//             <Menu.Item key="setting">
//               <Link to="/setting" style={{ color: "white" }}>
//                 Setting
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="register">
//               <Link to="/register" style={{ color: "white" }}>
//                 Register
//               </Link>
//             </Menu.Item>
//             {/* <Menu.Item key="logout">Logout</Menu.Item> */}
//             {/* <Menu.Item key="login">Login</Menu.Item> */}

//             {login ? (
//               <Menu.Item key="login" onClick={fetchLogin}>
//                 Logout
//               </Menu.Item>
//             ) : (
//               <Menu.Item key="login" onClick={fetchLogin}>
//                 <Link to="/login" style={{ color: "white" }}>
//                   Login
//                 </Link>
//               </Menu.Item>
//             )}
//             {/* {login ? (
//               <Menu.Item key="logout" onClick={fetchLogin()}>
//                 Logout
//               </Menu.Item>
//             ) : (
//               <Menu.Item key="login" onClick={fetchLogin()}>
//                 <Link to="/login" style={{ color: "white" }}>
//                   Login
//                 </Link>
//               </Menu.Item>
//             )} */}
//           </Menu>
//         </Header>

//         <Layout>
//           {/* 계정 리스트 */}
//           {menuOpen ? (
//             <div style={{ display: "flex", flexDirection: "column", backgroundColor: "white" }}>
//               <div style={{ display: "flex", justifyContent: "right", height: "50px", alignItems: "center" }}>
//                 <Button type="primary" ghost="true" icon={<LeftOutlined />} onClick={fetchMenuOpen} style={{ borderColor: "transparent" }} />
//               </div>
//               <Sider width={200} className="site-layout-background">
//                 <Menu
//                   mode="inline"
//                   defaultSelectedKeys={["1"]}
//                   defaultOpenKeys={["sub1"]}
//                   style={{
//                     height: "100%",
//                     borderRight: 0,
//                   }}
//                 >
// {accountsList.map((account) => {
//   return (
//     <Menu.Item key={account}>
//       <LaptopOutlined />
//       {/* <DetailPage account={account} /> */}
//       <Link to={`/detail?account=${account}`}> {account}</Link>
//     </Menu.Item>
//   );
// })}
//                 </Menu>
//               </Sider>
//             </div>
//           ) : (
//             <div style={{ position: "absolute", padding: "10px 10px 10px 5px" }}>
//               <Button type="ghost" icon={<RightOutlined />} onClick={fetchMenuOpen} style={{ borderColor: "transparent" }}>
//                 메일 리스트 열기
//               </Button>
//             </div>
//           )}

//           {/* 페이지 내용 */}
//           <Layout
//             style={{
//               padding: "50px 10px 10px 10px",
//               backgroundColor: "rgb(0, 128, 0,0.1)",
//             }}
//           >
//             <Content
//               className="site-layout-background"
//               style={{
//                 padding: 24,
//                 margin: 0,
//                 minHeight: 280,
//               }}
//             >
//               {/* 라우팅 */}
//               <Routes>
//                 <Route path="/" element={<DashBoard />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/signup" element={<SignupPage />} />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/scanning" element={<ScanningPage />} />
//                 <Route path="/setting" element={<SettingPage />} />
//                 <Route path="/detail" element={<DetailPage />} />
//               </Routes>
//             </Content>
//           </Layout>
//         </Layout>
//       </Layout>
//     </Router>
//   );
// };

// export default App;

// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import { Layout, Menu } from 'antd';
// import React, { useState } from 'react';
// const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("pp", "1"),
  getItem("Option 2", "2"),
  getItem("Option 3", "3"),
  getItem("Navigation One", "sub1", <MailOutlined />, [getItem("Option 5", "5"), getItem("Option 6", "6"), getItem("Option 7", "7"), getItem("Option 8", "8")]),
  getItem("Navigation Two", "sub2", [getItem("Option 9", "9"), getItem("Option 10", "10"), getItem("Submenu", "sub3", null, [getItem("Option 11", "11"), getItem("Option 12", "12")])]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          <div className="logo" style={{ height: "10%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "22px" }}>
            <Link to="/" style={{ color: "green" }}>
              <MailFilled />
              {/* EveryDay-Mail */}
            </Link>
          </div>
          <Menu theme="light" mode="inline" inlineCollapsed={collapsed}>
            <Menu.Item key="accounts" icon={<MailOutlined />}>
              Accounts
            </Menu.Item>
            <Menu.Item key="register" icon={<PlusCircleOutlined />}>
              <Link to="/register">Register</Link>
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
          {/* <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header> */}
          <Content
            className="site-layout-background"
            style={{
              // margin: "10px",
              // padding: 24,
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
