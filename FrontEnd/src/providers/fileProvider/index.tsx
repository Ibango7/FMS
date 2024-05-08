"use client";
import React, {
  useReducer,
  useState,
  FC,
  PropsWithChildren,
  useContext,
} from "react";
import {
  ArchiveAction,
  getArchFileAction,
  getFileAction,
  getGrantedAction,
  getSharedFilesAction,
  getUsersAction,
  loadDoneFileAction,
  loadFileAction,
  upLoadFileAction,
} from "./actions";
import {
  FileActionContext,
  FileStateContext,
  FILE_CONTEXT_INITIAL_STATE,
  FilePermissionDto,
} from "./context";
import { FileReducer } from "./reducer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notification, Alert } from "antd";
import { httpClient } from "../httpClients/httpClients";
import { resolve } from "path";
import { rejects } from "assert";
import { getCurrentUserId } from "@/app/home/layout";

const baseUri = process.env.NEXT_PUBLIC_BASE_URL;

const FileProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(FileReducer, FILE_CONTEXT_INITIAL_STATE);
  const [isInprogress, setIsInProgress] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const { archFiles } = useContext(FileStateContext);
  const router = useRouter();

  const warningMessage = () => {
    notification.open({
      message: "File Action",
      description: (
        <Alert
          message="error"
          description="Action in file failed"
          type="error"
          showIcon
        />
      ),
    });
  };

  const successMessage = (message: string) => {
    notification.open({
      message: "File",
      description: (
        <Alert
          message="success"
          description={message}
          type="success"
          showIcon
        />
      ),
    });
  };

  const getSharedFiles = (userId: number): Promise<any> => {
    dispatch(loadFileAction());
    return new Promise((resolve, reject) => {
      httpClient
        .get(`FilePermission/GetPermittedFiles?userId=${userId}`)
        .then((response) => {
          dispatch(getSharedFilesAction(response.data.result));
          dispatch(loadDoneFileAction());
        })
        .catch((error) => {
          dispatch(loadDoneFileAction());
        });
    });
  };

  const addPermission = (filePermission: FilePermissionDto): Promise<any> => {
    dispatch(loadFileAction());
    return new Promise((resolve, reject) => {
      httpClient
        .post(`FilePermission/AddPermission`, filePermission)
        .then((response) => {
          resolve(response);
          console.log("Added permission responses", response);

          dispatch(loadDoneFileAction());
          // Communicate with the notification service

          // sendMessageToQueue("notification", {id:});
        })
        .catch((error) => {
          reject(error);
          dispatch(loadDoneFileAction());
        });
    });
  };

  const getEmails = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpClient
        .get(`/User/GetAllUsers`)
        .then((response) => {
          resolve(response.data.result);
          dispatch(getUsersAction(response.data.result));
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getGrantedUsers = (userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpClient
        .get(`/FilePermission/GetPermittedFiles?userId=${userId}`)
        .then((response) => {
          resolve(response);
          console.log("Permission to users:::::",response.data)
          dispatch(getGrantedAction(response.data.resul))
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const renameFile = (
    newFileName: string,
    oldFileName: string,
    userId: number
  ): Promise<any> => {
    dispatch(loadFileAction());
    return new Promise((resolve, reject) => {
      httpClient
        .put(
          `/File/RenameFile?oldFileName=${oldFileName}&newFileName=${newFileName}&userId=${userId}`
        )
        .then((response) => {
          resolve(response);
          getFiles(userId);
          successMessage("File renamed Successful");
          dispatch(loadDoneFileAction());
        })
        .catch((error) => {
          reject(error);
          warningMessage();
          dispatch(loadDoneFileAction());
        });
    });
  };

  const downloadfile = (fileName: string): Promise<any> => {
    dispatch(loadFileAction());
    return new Promise((resolve, reject) => {
      httpClient
        .get(`/File/Download?filename=${fileName}`, { responseType: "blob" })
        .then((response) => {
          // Create a temporary anchor element
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          // Trigger the click event to start the download
          link.click();
          // Cleanup
          link.parentNode?.removeChild(link);
          window.URL.revokeObjectURL(url);
          resolve(response);
          dispatch(loadDoneFileAction());
        })
        .catch((error) => {
          reject(error);
          warningMessage();
          dispatch(loadDoneFileAction());
        });
    });
  };

  const deletefile = (fileName: string, userId: number): Promise<any> => {
    dispatch(loadFileAction());
    return new Promise((resolve, reject) => {
      httpClient
        .delete(`/File/Delete?filename=${fileName}&userId=${userId}`)
        .then((response) => {
          resolve(response);
          getFiles(userId);
          successMessage("File delete Successful");
          dispatch(loadDoneFileAction());
        })
        .catch((error) => {
          reject(error);
          warningMessage();
          dispatch(loadDoneFileAction());
          console.log("Error getting files", error);
        });
    });
  };

  const getFiles = (userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpClient
        .get(`/File/ListAllBlobs?userId=${userId}`)
        .then((response) => {
          resolve(response);
          dispatch(getFileAction(response.data.result));
        })
        .catch((error) => {
          reject(error);
          console.log("Error getting files", error);
        });
    });
  };

  const SetArchFile = (FileId: string, flag: boolean): Promise<any> => {
    return new Promise((resolve, reject) => {
      const userId = getCurrentUserId();
      httpClient
        .post(
          `/File/setArchiveFile?state=${flag}&fileId=${FileId}&userId=${userId}`
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          console.log("Error getting archived files");
        });
    });
  };

  const getArchFiles = (userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpClient
        .get(`/File/GetArchivedFiles?userId=${userId}`)
        .then((response) => {
          resolve(response);
          dispatch(getArchFileAction(response.data.result));
        })
        .catch((error) => {
          reject(error);
          console.log("Error getting archived files", error);
        });
    });
  };

  const uploadFile = (file: any, userId: number): Promise<any> => {
    // create a FormData object
    const formData = new FormData();
    // append the file to the formdata object
    formData.append("file", file);

    return new Promise((resolve, reject) => {
      {
        axios
          .post(`${baseUri}/File/UpLoad?userId=${userId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            dispatch(upLoadFileAction([]));
          })
          .catch((e) => {
            setErrorLogin(e.message);
            warningMessage();
          });
      }
    });
  };

  return (
    <FileStateContext.Provider
      value={{
        ...state,
      }}
    >
      <FileActionContext.Provider
        value={{
          uploadFile,
          getFiles,
          deletefile,
          downloadfile,
          renameFile,
          getEmails,
          addPermission,
          getSharedFiles,
          getArchFiles,
          SetArchFile,
          getGrantedUsers,
        }}
      >
        {children}
      </FileActionContext.Provider>
    </FileStateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(FileStateContext);

  if (context == undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
    console.log("useAuthState must be used within a AuthProvider");
  }
  return context;
};

const useActionsContext = () => {
  const context = useContext(FileActionContext);

  if (context == undefined) {
    throw new Error("useAuthActions must be used within a FileProvider");
    console.log("useAuthActions must be used within a FileProvider");
  }

  return context;
};

export default FileProvider;
