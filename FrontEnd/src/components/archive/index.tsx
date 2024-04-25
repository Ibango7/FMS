'use client';
import React, { useState } from "react";
import { Button, Table, UploadProps, message, Upload, Modal, Input, Avatar } from "antd";
import { PlusOutlined, UploadOutlined,FileOutlined } from "@ant-design/icons";


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
    title: "Archived date",
    dataIndex: "modified",
    key: "modified",
  },
];

const data = [
  {
    key: "1",
    name: "Document1",
    modified: "2024-04-24",
  },
  {
    key: "2",
    name: "Document2",
    modified: "2024-04-23",
  },
];


export default function ArchivedFile() {
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
      <h2>Archived files</h2>
      <Table
        rowClassName="table-row"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}



