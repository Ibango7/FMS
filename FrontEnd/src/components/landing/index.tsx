"use client";
import React from "react";
import { Flex, Layout } from "antd";
const { Header, Footer, Content } = Layout;
import styles from "./styles/landing.module.scss";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import signaturePic from "../../../public/assets/digital-signature.png";
import filePic from "../../../public/assets/document.png";
import configPic from "../../../public/assets/team.png";
import { useRouter } from 'next/navigation';

const Landing: React.FC = () => {
  const router = useRouter();
  const GoToLogin = () =>{
    router.push('/login');
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <Layout className={styles.layoutStyle}>
          <Header className={styles.headerStyle}>
            <div className={styles.headerContent}>
              <div>
                <Image src={logo} alt="logo" className={styles.logoStyle} />
              </div>
              <div className={styles.headerContentText}>
                <span>FileLock</span>
                <p>Your Secure file management system</p>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.getStartedButton} onClick={GoToLogin}>Get started</button>
              </div>
            </div>
          </Header>
          <Content className={styles.contentStyle}>
            <span>Securely manage your files with FileLock</span>
            <p></p>
            <div className={styles.contentWrapper}>
              <div>
                <Image
                  src={signaturePic}
                  alt="signature"
                  className={styles.logoStyle}
                />
                <p>
                  Ensure document authenticity with FileLock&rsquo;s digital
                  signature feature, safeguarding your files from tampering and
                  forgery
                </p>
              </div>
              <div>
                <Image src={filePic} alt="file" className={styles.logoStyle} />
                <p>
                  Effortlessly store and organize your files for seamless
                  management.
                </p>
              </div>
              <div>
                <Image
                  src={configPic}
                  alt="config"
                  className={styles.logoStyle}
                />
                <p>
                  Define access and actions. Set granular permissions for
                  users/groups to ensure data security.
                </p>
              </div>
            </div>
          </Content>
          <Footer className={styles.footerStyle}></Footer>
        </Layout>
      </div>
    </div>
  );
};

export default Landing;
