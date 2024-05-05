"use client";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Table,
  UploadProps,
  message,
  Upload,
  Dropdown,
  Modal,
  Avatar,
  Space,
  Menu,
  Spin,
  Input,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  FileOutlined,
  DownOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  DownloadOutlined,
  SnippetsOutlined,
  EyeOutlined,
  CheckOutlined
} from "@ant-design/icons";
import styles from "./homeStyle.module.scss";
import "./style.css";
import dynamic from "next/dynamic";
import { editorData } from "../../components/custom-editor";
import {
  FILE_CONTEXT_INITIAL_STATE,
  FileActionContext,
  FileStateContext,
} from "@/providers/fileProvider/context";
import { FileReducer } from "@/providers/fileProvider/reducer";
import { getCurrentUserId } from "./layout";
import WithAuth from "@/components/withAuth";

const { TextArea } = Input;
const CustomEditor = dynamic(
  () => {
    return import("../../components/custom-editor");
  },
  { ssr: false }
);

function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleRenameFile, setIsModalVisibleRenameFile] =
    useState(false);
  const [isModalPermissions, setIsModalPermissions] = useState(false);
  const [content, setContent] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [oldFileName, setOldFIleName] = useState("");
  const [emails, setEmails] = useState("");
  const [permissions, setPermissions] = useState<any>({
    CanView: false,
    CanEdit: false,
    CanDelete: false,
    CanDownload: false,
    CanSign: false,
  });

  const [state, dispatch] = useReducer(FileReducer, FILE_CONTEXT_INITIAL_STATE);
  const { getFiles, deletefile, downloadfile, renameFile } =
    useContext(FileActionContext);
  const { userFiles, loading } = useContext(FileStateContext);

  useEffect(() => {
    const handleGetFiles = async () => {
      let response = null;
      try {
        let userId = getCurrentUserId();
        if (getFiles && userId) {
          response = await getFiles(userId);
          if (response) {
            // dispatch(getFileAction(response))
          }
        }
      } catch (error) {
        console.log("Error gettingt files", error);
      }
    };
    handleGetFiles();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
      console.log("Content to save:", editorData);
    }
    if (isModalVisibleRenameFile) {
      if (!newFileName) {
        return;
      }
      handleRename(newFileName, oldFileName);
      setIsModalVisibleRenameFile(false);
      setNewFileName("");
    }
    if (isModalPermissions) {
      if (!emails) {
        return;
      }
      console.log("Emails",emails);
      console.log("Permissions",permissions);
      setIsModalPermissions(false);
    }
  };
  
  const handleCancel = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    if (isModalVisibleRenameFile) {
      setIsModalVisibleRenameFile(false);
      setNewFileName("");
    }
    if (isModalPermissions) {
      setIsModalPermissions(false);
      setEmails("");
    }
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
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
      title: "Size",
      dataIndex: "size",
      key: "size",
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
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Dropdown overlay={menu(record)}>
            <Button>
              <Space>
                File Action <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

  // dropDown File Options
  const menu = (record: any) => (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item key="1">
        {" "}
        <DeleteOutlined /> Delete{" "}
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <EditOutlined /> Rename{" "}
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <SettingOutlined /> Manage Permissions
      </Menu.Item>
      <Menu.Item key="4">
        {" "}
        <DownloadOutlined /> Download
      </Menu.Item>
      <Menu.Item key="5">
        {" "}
        <SnippetsOutlined /> Sign{" "}
      </Menu.Item>
    </Menu>
  );

  // file actions
  const handleMenuClick = (e: any, file: any) => {
    switch (e.key) {
      case "1":
        handleDeleteFile(file.name);
        break;
      case "2":
        setOldFIleName(file.name);
        renameFileModal();
        break;
      case "3":
        managePermissionsModal();
        break;
      case "4":
        handleDownloadFile(file.name);
        break;
      case "5":
        break;
      default:
        break;
    }
  };

  // open modals
  const managePermissionsModal = () =>  setIsModalPermissions(true);
  const renameFileModal = () => setIsModalVisibleRenameFile(true);

  const handleRename = async (newFileName: string, oldFileName: string) => {
    try {
      const userId = getCurrentUserId();
      if (renameFile && userId) {
        await renameFile(newFileName, oldFileName, userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e: any) => {
    setEmails(e.target.value);
  };

  const onChangeFileRename = async (e: any) => {
    setNewFileName(e.target.value);
  };

  const handleDownloadFile = async (fileName: string) => {
    try {
      if (downloadfile) {
        await downloadfile(fileName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    try {
      const userId = getCurrentUserId();
      if (deletefile && userId) {
        await deletefile(fileName, userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const baseUri = process.env.NEXT_PUBLIC_BASE_URL;
  const props: UploadProps = {
    name: "file",
    action: `${baseUri}/File/UpLoad?userId=${getCurrentUserId()}`,
    headers: {
      authorization: "authorization-text",
    },

    async onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        if (getCurrentUserId()) {
          const userId: any = getCurrentUserId();
          if (getFiles && userId) getFiles(userId);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div className={styles.spinnerContainer}>
        {loading && <Spin size="large" />}
      </div>
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
            type="default"
            icon={<UploadOutlined />}
          >
            Upload
          </Button>
        </Upload>
      </div>
      {/* Rename file modal */}
      <Modal
        title="Rename File"
        visible={isModalVisibleRenameFile}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={newFileName}
          onChange={onChangeFileRename}
          placeholder="Enter new filename"
        />
      </Modal>

      {/* Manage permissions modal */}
      <Modal
        title="File Permissions"
        visible={isModalPermissions}
        onOk={() => handleOk()}
        onCancel={handleCancel}
      >
        <TextArea
          value={emails}
          onChange={handleEmailChange}
          placeholder="Enter email(s) separated by comma"
          autoSize={{ minRows: 2 }}
        />
        <Checkbox.Group
          style={{ marginTop: "10px", display: "block" }}
          onChange={(checkedValues) => {
            const updatedPermissions: any = {};
            Object.keys(permissions).forEach((permission) => {
              updatedPermissions[permission] =
                checkedValues.includes(permission);
            });
            setPermissions(updatedPermissions);
          }}
          value={Object.keys(permissions).filter(
            (permission) => permissions[permission]
          )}
        >
          <Checkbox value="CanView"> <EyeOutlined /> Can View</Checkbox><br></br>
          <Checkbox value="CanEdit"> <EditOutlined /> Can Edit</Checkbox><br></br>
          <Checkbox value="CanDelete"> <DeleteOutlined />Can Delete</Checkbox><br></br>
          <Checkbox value="CanDownload"> <DownloadOutlined /> Can Download</Checkbox><br></br>
          <Checkbox value="CanSign"> <CheckOutlined />Can Sign</Checkbox>
        </Checkbox.Group>
      </Modal>

      {/* Editor modal */}
      <Modal
        width={800}
        title="Create Document"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CustomEditor initialData="<h1> Type your text in here </h1>" />
      </Modal>
      <Table
        rowClassName="table-row"
        dataSource={userFiles?.map((file) => ({
          key: file.id,
          icon: <Avatar icon={<FileOutlined />} />,
          name: file.title,
          size: +file.fileSize + " bytes",
          access: " # members",
          modified: file.createdDate,
        }))}
        columns={columns}
      />
    </div>
  );
}
export default WithAuth(HomePage);
