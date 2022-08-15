import React, { useState, useEffect, Component } from "react";
import styles from "./RegisterPage.module.css";
import { Button, Form, Input, Select, Result, InputNumber, Typography } from "antd";
// import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
import { CloseCircleOutlined } from "@ant-design/icons";

function RegisterPage() {
  const [success, setSuccess] = useState("");
  const { Option } = Select;
  const { Paragraph, Text } = Typography;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const registeredAccountsList = ["test@naver.com"];

  const onFinish = (values) => {
    if (registeredAccountsList.includes(values.email.id + values.email.host)) {
      setSuccess("overlap");
    }
    // 백엔드 요청 success일 경우
    else setSuccess("success");
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {success === "success" ? (
          <Result
            status="success"
            title="Successfully Registered Your Account!"
            subTitle="Registered: molly5596@naver.com"
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
        ) : success === "overlap" ? (
          <>
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
            >
              {/* <div className="desc">
                <Paragraph>
                  <Text
                    strong
                    style={{
                      fontSize: 16,
                    }}
                  >
                    The content you submitted has the following error:
                  </Text>
                </Paragraph>
                <Paragraph>
                  <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been frozen. <a>Thaw immediately &gt;</a>
                </Paragraph>
                <Paragraph>
                  <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet eligible to apply. <a>Apply Unlock &gt;</a>
                </Paragraph>
              </div> */}
            </Result>
          </>
        ) : (
          <>
            <div className={styles.title}>새 이메일 계정 등록</div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className={styles.form}>
              {/* <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}
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
