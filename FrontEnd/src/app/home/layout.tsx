"use client";
import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import {
  FileOutlined,
  SolutionOutlined,
  FolderOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
import styles from "./homeStyle.module.scss";
import Search from "@/components/search";
import Notification from "@/components/notification";
import Link from "next/link";
import AppProviders from "@/providers/appProviders/indext";
import { AuthActionContext } from "@/providers/authProvider/context";
import { useLogin } from "@/providers/authProvider";
import { useRouter } from "next/navigation";

export const checkUser = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (token && userId) {
    return true;
  }
  return false;
};
export const logOutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

export const getCurrentUserId = () => {
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    const ans = parseInt(storedUserId);
    return ans;
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout } = useContext(AuthActionContext);
  const router = useRouter();

  const handleLogOut = async () => {
    if (checkUser()) {
      logOutUser();
      router.push("/login");
      console.log("logged out successfully");
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleLogOut();
  };
  return (
    <AppProviders>
      <html lang="en">
        <body>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider width={200}>
              <Menu
                className={styles.siderStyle}
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1" icon={<FileOutlined />}>
                  <Link href="/home">
                    <span className={styles.menuItem}>My Files</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FileOutlined />}>
                  <Link href="/home/shared">
                    <span className={styles.menuItem}>Shared</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<SolutionOutlined />}>
                  <Link href="/home/signatures">
                    <span className={styles.menuItem}>Signatures</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<FolderOutlined />}>
                  <Link href="/home/archived">
                    <span className={styles.menuItem}>Archived Files</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<LogoutOutlined />}>
                  <Link href="" onClick={handleClick}>
                    <span className={styles.menuItem}>Log out</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Content className={styles.contentStyle}>
                <div className={styles.topContent}>
                  <div className={styles.topContentSearch}>
                    <Search />
                  </div>
                  <div>
                    <Notification />
                  </div>
                </div>
                {children}
              </Content>
            </Layout>
          </Layout>
        </body>
      </html>
    </AppProviders>
  );
}
