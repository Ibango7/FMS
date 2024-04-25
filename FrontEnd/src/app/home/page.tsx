'use client';
import React, { useState } from "react";
import { Button, Table, UploadProps, message, Upload, Modal, Input, Avatar } from "antd";
import { PlusOutlined, UploadOutlined,FileOutlined } from "@ant-design/icons";
import styles from './homeStyle.module.scss';
import './style.css';

const columns = [
  {
    title: "Icon",
    dataIndex: "icon",
    key: "icon",
    render: () => <Avatar icon={<FileOutlined />} />
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Access",
    dataIndex: "access",
    key: "access",
  },
  {
    title: "Modified",
    dataIndex: "modified",
    key: "modified",
  },
];

const data = [
  {
    key: "1",
    name: "Document1",
    access: "2 members",
    modified: "2024-04-24",
  },
  {
    key: "2",
    name: "Document2",
    access: "3 members",
    modified: "2024-04-23",
  },
];

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Content to save:",content);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleContentChange = (e:any) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Button
          className={styles.buttonStyle}
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginRight: 60 }}
          onClick={showModal} // Add onClick event to open the modal
        >
          Create
        </Button>
        <Upload {...props}>
          <Button
          className={styles.buttonStyle}  
          type="default" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </div>
      <Modal
        title="Create Document"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea 
          rows={4} 
          placeholder="Enter your document text here"
          value={content} 
          onChange={handleContentChange} // Add onChange event to handle content change
        />
      </Modal>
      <Table
        rowClassName="table-row"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}