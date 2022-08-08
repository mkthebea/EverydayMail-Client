import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import styles from "./LoginPage.module.css";

function LoginPage() {
  // 로그인 상태 관리
  // const [login, setLogin] = useState(false);
  // const fetchLogin = async () => {
  //   const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/login");
  //   setLogin(response.data.isLogin);
  //   console.log("로그인 상태: ", login);
  // };

  const [login, setLogin] = useState(false);
  const fetchLogin = () => {
    setLogin(!login);
    console.log("로그인 상태: ", login);
  };

  const onFinish = (values) => {
    // 로그인 성공시 메인 페이지로 이동
    console.log("Success:", values);
    window.location.replace("/");
    fetchLogin();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>Login</div>
        <Form
          className={styles.form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]} style={{ width: "100%" }}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <span style={{ marginLeft: "50px" }}>No Account? </span>
            <Link to="/signup">
              <u>Sign Up EveryDay-Mail</u>
            </Link>
          </Form.Item>
          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <span>No Account? </span>
            <Link to="/signup">Sign Up EveryDay-Mail</Link>
          </Form.Item> */}
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
