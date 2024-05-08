"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Table,
  UploadProps,
  message,
  Upload,
  Modal,
  Input,
  Avatar,
} from "antd";
import { PlusOutlined, UploadOutlined, FileOutlined } from "@ant-design/icons";
import { getCurrentUserId } from "@/app/home/layout";
import {
  FileActionContext,
  FileStateContext,
} from "@/providers/fileProvider/context";
import moment from "moment";

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
  const { getArchFiles,SetArchFile } = useContext(FileActionContext);
  const { archFiles } = useContext(FileStateContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const handleArchivedFiles = async () => {
      let response = null;
      try {
        let userId = getCurrentUserId();
        if (getArchFiles && userId) {
          response = await getArchFiles(userId);
          if (response) {
            // dispatch(getFileAction(response))
          }
        }
      } catch (error) {
        console.log("Error getting archived files", error);
      }
    };
    handleArchivedFiles();
  }, []);

  const handleArchiveFile = async (fileId: any) => {
    try {
      const userId = getCurrentUserId();
      if (SetArchFile && userId) {
        Modal.confirm({
          title: "Restore",
          content: "Are you sure you want to restore this file?",
          onOk: async () => {
            await SetArchFile(fileId.key, false);
            if(getArchFiles) {await getArchFiles(userId);}
          },
          onCancel() {
            console.log("Restore file canceled");
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: () => <Avatar icon={<FileOutlined />} />,
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
    {
      title: "Actions",
      key: "actions",
      render: (fileId: string) => (
        <>
          <Button onClick={() =>handleArchiveFile(fileId)}>Restore File</Button>
        </>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Content to save:", content);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <h2>Archived files</h2>
      <Table
        rowClassName="table-row"
        dataSource={archFiles?.map((file) => ({
          key: file.id,
          icon: <Avatar icon={<FileOutlined />} />,
          name: file.title,
          size: +file.fileSize + " bytes",
          modified: moment(file.archivedDate).format("YYYY-MM-DD HH:mm:ss")
        }))}
        columns={columns}
      />
    </div>
  );
}
