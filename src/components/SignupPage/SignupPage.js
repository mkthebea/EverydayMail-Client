import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message, Result } from "antd";
import styles from "./SignupPage.module.css";
import axios from "axios";

function SignupPage() {
  const [signUp, setSignUp] = useState(false);

  const fetchSignUp = async (values) => {
    await axios.post("/signup/", values).then((response) => {
      if (response.data.success) {
        setSignUp(response.data.success);
      } else {
        message.error(response.data.errorMessage);
      }
      // console.log("signup send data: ", values);
      // console.log("signup response: ", response);
    });
  };

  const onFinish = async (values) => {
    // console.log("values: ", values);
    fetchSignUp(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {signUp ? (
          <Result
            status="success"
            title="Successfully signed up for EveryDay-Mail!"
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  window.location.replace("/");
                }}
              >
                Go Home
              </Button>,
              <Button
                key="register"
                onClick={() => {
                  window.location.replace("/register");
                }}
              >
                Go to register your mail account
              </Button>,
            ]}
          />
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
                label="ID"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Please input your ID!",
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
