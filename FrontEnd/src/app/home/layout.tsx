"use client";
import React from "react";
import { Layout, Menu } from "antd";
import {
  FileOutlined,
  SolutionOutlined,
  FolderOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
import styles from "./homeStyle.module.scss";
import Search from "@/components/search";
import Notification from "@/components/notification";
import Link from "next/link";
import AppProviders from "@/providers/appProviders/indext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                    <span className={styles.menuItem}>All Files</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SolutionOutlined />}>
                  <Link href="/home/signatures">
                    <span className={styles.menuItem}>Signatures</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FolderOutlined />}>
                  <Link href="/home/archived">
                    <span className={styles.menuItem}>Archived Files</span>
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
