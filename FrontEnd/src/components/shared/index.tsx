import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Button, Popover, Spin, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import Image from "next/image";
import test from "../../../public/assets/document.png";
import {
  FileActionContext,
  FileStateContext,
} from "@/providers/fileProvider/context";
import { getCurrentUserId } from "@/app/home/layout";
import styles from "./styles/styles.module.scss";

function Shared() {
  const { getSharedFiles, downloadfile, deletefile } = useContext(FileActionContext);
  const { sharedFiles, loading } = useContext(FileStateContext);
  const [hoveredFile, setHoveredFile] = useState(null);

  useEffect(() => {
    const handleGetFiles = async () => {
      try {
        const userId = getCurrentUserId();
        if (getSharedFiles && userId) {
          const response = await getSharedFiles(userId);
          if (response) {
            // dispatch(getFileAction(response))
          }
        }
      } catch (error) {
        console.log("Error getting files", error);
      }
    };

    handleGetFiles();
  }, []);

  // permission actions
  const handleDownloadFile = async (file: any) => {
    try {
      if (downloadfile) {
        const filename: string = file.file.title;
        await downloadfile(filename); //file.file.title
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewFile = async (file: any) => {
    console.log(" handle View file");
  };

  const handleEditFile = async (file: any) => {
    console.log("handle Edit file");
  };

  const handleDeleteFile = async (file: any) => {
    try {
      const userId = getCurrentUserId();
      if (deletefile && userId) {
        Modal.confirm({
          title: "Confirm Deletion",
          content: "Are you sure you want to delete this file?",
          onOk: async () => {
            const filename: string = file.file.title;
            await deletefile(filename, userId);
          },
          onCancel() {
            console.log("Deletion canceled");
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignFile = async (file: any) => {
    console.log("Handle sign file");
  };

  return (
    <div>
      <h1>Files shared with you</h1>
      <div className={styles.spinnerContainer}>
        {loading && <Spin size="large" />}
      </div>

      <Row gutter={[16, 16]}>
        {sharedFiles?.map((file, index) => (
          <Col key={index} span={6}>
            <Link href="">
              <Popover
                content={
                  <div>
                    {file.canView && (
                      <Button onClick={() => handleViewFile(file)}>View</Button>
                    )}
                    {file.canEdit && (
                      <Button onClick={() => handleEditFile(file)}>Edit</Button>
                    )}
                    {file.canDelete && (
                      <Button onClick={() => handleDeleteFile(file)}>
                        Delete
                      </Button>
                    )}
                    {file.canDownload && (
                      <Button onClick={() => handleDownloadFile(file)}>
                        Download
                      </Button>
                    )}
                    {file.canSign && (
                      <Button onClick={() => handleSignFile(file)}>Sign</Button>
                    )}
                  </div>
                }
                trigger="hover"
              >
                <Card
                  className="{styles.card}"
                  cover={
                    <Image
                      src={test}
                      alt="book"
                      className={styles.imageStyle}
                    />
                  }
                  onMouseEnter={() => setHoveredFile(file)}
                  onMouseLeave={() => setHoveredFile(null)}
                >
                  <Meta title="" description={`Name: ${file.file.title}`} />
                </Card>
              </Popover>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Shared;
