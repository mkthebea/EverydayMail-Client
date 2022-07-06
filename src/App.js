import { React, useState } from "react";
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

const { Header, Content, Sider } = Layout;
// const topBarList = ["profile", "setting", "register", "logout"].map((key) => ({
//   key,
//   label: `${key}`,
// }));
const items2 = [LaptopOutlined, LaptopOutlined, LaptopOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    // icon: React.createElement(icon),
    icon: <LaptopOutlined />,
    label: `${key}@naver.com`,
    // children: new Array(4).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    //   return {
    //     key: subKey,
    //     label: `option${subKey}`,
    //   };
    // }),
  };
});

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const fetchMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (event) => {
    console.log(event.target.value);
    //you can get here event.target.value
    //filter the content
    //setState the content your component will re render and content will be updated.
  };
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Header className="header" style={{ padding: "0px", display: "flex", flexDirection: "row" }}>
          <div style={{ backgroundColor: "green", width: "100%", paddingLeft: "15px", color: "white", fontSize: "20px" }}>
            <Link to="/" style={{ color: "white" }}>
              <MailFilled />
              &nbsp;&nbsp;&nbsp;EveryDay Mail
            </Link>
          </div>
          {/* <Menu theme="light" style={{ width: "100%", paddingRight: "50px", backgroundColor: "green", color: "white", flexDirection: "row-reverse" }} mode="horizontal" items={topBarList} /> */}
          <Menu theme="light" style={{ width: "100%", paddingRight: "50px", backgroundColor: "green", color: "white", flexDirection: "row-reverse", border: "0px" }} mode="horizontal">
            {/* "profile", "setting", "register", "logout" */}
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
          {menuOpen ? (
            <div style={{ display: "flex", flexDirection: "column", backgroundColor: "white" }}>
              <div style={{ display: "flex", justifyContent: "right" }}>
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
                  items={items2}
                />
              </Sider>
            </div>
          ) : (
            <div style={{ position: "absolute", padding: "10px" }}>
              <Button type="ghost" icon={<RightOutlined />} onClick={fetchMenuOpen} style={{ borderColor: "transparent" }}>
                메일 리스트 열기
              </Button>
            </div>
          )}
          <Layout
            style={{
              padding: "50px 24px 24px 24px",
              backgroundColor: "rgb(0, 128, 0,0.1)",
            }}
          >
            {/* <div style={{ margin: "10px" }}></div> */}
            {/* <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/scanning" element={<ScanningPage />} />
                <Route path="/setting" element={<SettingPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>

    // <>
    //   <TopBar />
    //   <Router>
    //     <div>
    //       <Routes>
    //         <Route path="/" element={<DashBoard />} />
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/register" element={<RegisterPage />} />
    //         <Route path="/scanning" element={<ScanningPage />} />
    //         <Route path="/setting" element={<SettingPage />} />
    //       </Routes>
    //     </div>
    //   </Router>
    // </>
  );
};

export default App;