import React, { useState, useEffect, Component } from "react";
import styles from "./RegisterPage.module.css";
import { Button, Form, Input, Select, Result } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";

function RegisterPage() {
  const [status, setStatus] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const onFinish = async (values) => {
    console.log("register send data: ", { mailAddr: values.email.id + values.email.host, mailPw: values.user.password });

    const response = await axios.post("/account/register/", {
      mailAddr: values.email.id + values.email.host,
      mailPw: values.user.password,
    });
    // console.log("register send data: ", values);
    // console.log("register response: ", response);
    setStatus(response.data.status);
    setRegisteredEmail(values.email.id + values.email.host);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {status === "success" ? (
          <Result
            status="success"
            title="Successfully Registered Your Account!"
            subTitle={"Registered: " + registeredEmail}
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
                Register More
              </Button>,
            ]}
          />
        ) : status === "overlap" ? (
          <Result
            status="error"
            title="Submission Failed"
            subTitle="This email has already been registered to another account."
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
                Register Another Account
              </Button>,
            ]}
          />
        ) : status === "fail" ? (
          <Result
            status="error"
            title="Authentication Failed"
            subTitle="The passwords for the accounts do not match."
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
                Register Again
              </Button>,
            ]}
          />
        ) : (
          <>
            <div className={styles.title}>새 이메일 계정 등록</div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} className={styles.form}>
              <Form.Item label="Email">
                <Input.Group compact>
                  <Form.Item
                    name={["email", "id"]}
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "ID is required",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "60%",
                      }}
                      placeholder="Input ID"
                    />
                  </Form.Item>

                  <Form.Item
                    name={["email", "host"]}
                    style={{
                      width: "40%",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Mail host is required",
                      },
                    ]}
                  >
                    <Select placeholder="Select mail host">
                      <Option value="@naver.com">@naver.com</Option>
                      <Option value="@daum.net">@daum.net</Option>
                      <Option value="@gmail.com">@gmail.com</Option>
                      <Option value="@kakao.com">@kakao.com</Option>
                      <Option value="@nate.com">@nate.com</Option>
                    </Select>
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item
                name={["user", "password"]}
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
