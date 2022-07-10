import { React, useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

function LoginPage() {
  // 로그인 상태 관리
  const [login, setLogin] = useState(false);
  const fetchLogin = async () => {
    const response = await axios.get("https://66d970b7-c9c2-4dfb-be10-e28048802b89.mock.pstmn.io/api/login");
    setLogin(response.data.isLogin);
    console.log("로그인 상태: ", login);
  };
  // useEffect(() => {
  //   fetchLogin();
  // }, []);

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
    // <div style={{ padding: "24px", margin: "0px", minHeight: "280px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      // style={{ padding: "24px", margin: "0px", minHeight: "280px", display: "flex", justifyContent: "center", alignItems: "center" }}
      style={{ paddingTop: "20vh" }}
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]} style={{ width: "100%" }}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    // </div>
  );
}

export default LoginPage;
