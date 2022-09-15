import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [login, setLogin] = useState(false);
  const fetchLogin = () => {
    setLogin(!login);
    // console.log("로그인 상태: ", login);
  };

  const onFinish = async (values) => {
    const response = await axios.post("/api/login/", values);
    // console.log("login send data:", values);
    // console.log("login response: ", response);

    // 로그인 성공시 메인 페이지로 이동
    if (response.data.success) {
      message.success("로그인 성공");

      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
      fetchLogin();
    } else {
      message.error(response.data.errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>Login</div>
        <Form className={styles.form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
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
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
