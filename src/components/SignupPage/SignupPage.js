import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import styles from "./SignupPage.module.css";
import axios from "axios";

function SignupPage() {
  const [signUp, setSignUp] = useState(false);
  const fetchSignUp = async (values) => {
    const response = await axios.post("https://87e22f10-f2a1-494c-8ae5-71f15eaa1823.mock.pstmn.io/signup", values);
    console.log("전송 데이터: ", values, "응답: ", response);
    setSignUp(response.data.success);
    if (!signUp) message.error("에러 발생");
  };
  const onFinish = async (values) => {
    console.log("values: ", values);
    fetchSignUp(values);
    // console.log("Success:", values);
    // window.location.replace("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {signUp ? (
          <div>회원 가입 성공!</div>
        ) : (
          <>
            <div className={styles.text}>Sign Up</div>
            <Form
              className={styles.form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
