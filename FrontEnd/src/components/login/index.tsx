import React, { useState, useContext } from "react";
import { Tabs, Form, Input, Button, Spin } from "antd";
import styles from "./styles/login.module.scss";
import {
  AuthActionContext,
  AuthStateContext,
  IAuthLogin,
} from "@/providers/authProvider/context";
import { useRouter } from "next/navigation";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import {
  IRegister,
  RegisterActionContext,
  RegisterStateContext,
} from "@/providers/registerProvider/context";

const { TabPane } = Tabs;
const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { login } = useContext(AuthActionContext);
  const { registerUser } = useContext(RegisterActionContext);
  const { loadingLogin } = useContext(AuthStateContext);
  const { loadingRegister } = useContext(RegisterStateContext);
  const router = useRouter();
  const [registerForm] = Form.useForm();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const onFinishLogin = async (values: any) => {
    try {
      const input: IAuthLogin = {
        password: values.password,
        userNameOrEmailAddress: values.email,
      };
      console.log("Received values from input:", input);
      const response = await login(input);
      router.push("/home");
    } catch (error) {
      console.log("Error login in", error);
    }
  };

  const onFinishRegister = async (values: any) => {
    console.log("Received values of form: ", values);
    const input: IRegister = {
      name: "name" +values.email,
      surname: "surname" +values.email,
      userName: "Filer_"+ values.email,
      emailAddress: values.email,
      password: values.password,
      isActive: true,
      // roleNames: ["Pages.Users"],
    };
    registerUser(input);
    registerForm.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
        {/* Ant Design image */}
        <Image src={logo} alt="Ant Design Logo" className={styles.Logo} />
      </div>
      <div className={styles.rightSection}>
        <div>{loadingLogin && <Spin size="large" />}</div>
        <div>{loadingRegister && <Spin size="large" />}</div>
        <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
          <TabPane tab="Login" key="login">
            <Form
              className={styles.loginForm}
              name="loginForm"
              initialValues={{ remember: true }}
              onFinish={onFinishLogin}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
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
             form={registerForm} // Assign form instance to register form
              className={styles.loginForm}
              name="registerForm"
              onFinish={onFinishRegister}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
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
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                />
              </Form.Item>
              <Form.Item>
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
    </div>
  );
};

export default Login;
