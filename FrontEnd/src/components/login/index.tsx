import React, { useState, useContext } from "react";
import { Tabs, Form, Input, Button } from "antd";
import styles from "./styles/login.module.scss";
const { TabPane } = Tabs;
import {
  AuthActionContext,
  IAuthLogin,
} from "@/providers/authProvider/context";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { login } = useContext(AuthActionContext);
  const router = useRouter();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const onFinish = async (values: any) => {
    try {
      const input: IAuthLogin = {
        password: values.password,
        userNameOrEmailAddress: values.email,
      };
      console.log("Success:", values);
      const response = await login(input);
    } catch (error) {
      console.log("Error loging in", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.loginContainer}>
      <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
        <TabPane tab="Login" key="login">
          <Form
            className={styles.loginForm}
            name="loginForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input a valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Register Account" key="register">
          <Form
            className={styles.loginForm}
            name="registerForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input a valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Login;
