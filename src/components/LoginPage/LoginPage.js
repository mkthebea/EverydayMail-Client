import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import styles from "./LoginPage.module.css";

// 비밀번호 두 번 입력 => 같으면 성공

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

  const onFinish = async (values) => {
    // const response = await axios.post("https://fe0a1beb-6964-461b-a48c-fa425f9698ea.mock.pstmn.io/api/login/", values);
    const response = await axios.post("http://3.34.232.130:8080/everydayMail/login/", {
      id: "idchaeyeon",
      password: "pwchaeyeon2",
    });

    // 로그인 성공시 메인 페이지로 이동
    console.log("login send data:", values);
    console.log("login response: ", response);
    if (response.data.success) {
      message.success("로그인 성공");
      // setTimeout(() => {
      //   window.location.replace("/");
      // }, 1000);
      // fetchLogin();
    } else {
      message.error("로그인 실패");
    }
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
          <Form.Item label="ID" name="id" rules={[{ required: true, message: "Please input your ID!" }]} style={{ width: "100%" }}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>
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
