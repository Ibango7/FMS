import { MenuProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  DownloadOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { FileActionContext } from "@/providers/fileProvider/context";
import { useContext } from "react";
import { getCurrentUserId } from "@/app/home/layout";

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
  switch (e.key) {
    case "1":
      console.log("Testing delete file:::: 0");
      DeleteFile("fileName");
      break;
    case "2":
      break;
    case "3":
      break;
    case "4":
      break;
    case "5":
      break;
    default:
      break;
  }
};

const DeleteFile = async (fileName: string) => {
  const { deletefile } = useContext(FileActionContext);
  try {
    const userId = getCurrentUserId();
    if (deletefile && userId) {
      await deletefile(fileName, userId);
    }
  } catch (error) {
    console.log(error);
  }
};

export default DeleteFile;

export const items: MenuProps["items"] = [
  {
    label: "Delete",
    key: "1",
    icon: <DeleteOutlined />,
    danger: true,
  },
  {
    label: "Rename",
    key: "2",
    icon: <EditOutlined />,
  },
  {
    label: "Manage Permissions",
    key: "3",
    icon: <SettingOutlined />,
  },
  {
    label: "Download",
    key: "4",
    icon: <DownloadOutlined />,
  },
  {
    label: "Sign",
    key: "5",
    icon: <SnippetsOutlined />,
  },
];

export const menuProps = {
  items,
  onClick: handleMenuClick,
};
