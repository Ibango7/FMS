import { IstateContext } from "./context";
import { createAction } from "redux-actions";

export const FileActionEnums = {
  UPLOAD_FILE: "UPLOAD_FILE",
  DOWNLOAD_FILE: "DOWNLOAD_FILE",
  DELETE_FILE: "DELETE_FILE",
  GET_FILE: "GET_FILES",
  SET_LOADER: "LOADER",
  GET_USERS: "USERS",
  ADD_PERMISSION: "ADD_PERMISSION",
  GET_SHARED_FILES: "GET_SHARED_FILES",
  SET_ARCHIVE: "SET_ARCHIVE_FILE",
  GET_ARCHIVED_FILES: "GET_ARCHIVED_FILES",
  SET_UNARCHIVE: "SET_UNARCHIVE",
  GET_GRANTED_USERS: "GET_GRANTED_USERS",
};

export const upLoadFileAction = createAction<IstateContext, any[]>(
  FileActionEnums.UPLOAD_FILE,
  (file) => ({ file })
);
export const getFileAction = createAction(
  FileActionEnums.GET_FILE,
  (userFiles: any[]) => ({ userFiles })
);
export const deleteFileAction = createAction(
  FileActionEnums.GET_FILE,
  (file: any) => ({ file })
);
export const loadFileAction = createAction<IstateContext>(
  FileActionEnums.GET_FILE,
  () => ({ loading: true })
);
export const loadDoneFileAction = createAction<IstateContext>(
  FileActionEnums.GET_FILE,
  () => ({ loading: false })
);
export const getUsersAction = createAction<IstateContext, any[]>(
  FileActionEnums.GET_USERS,
  (users: any[]) => ({ users })
);
export const addPermissionAction = createAction<IstateContext>(
  FileActionEnums.ADD_PERMISSION
);

export const getSharedFilesAction = createAction<IstateContext, any[]>(
  FileActionEnums.GET_SHARED_FILES,
  (sharedFiles: any[]) => ({ sharedFiles })
);

export const ArchiveAction = createAction<IstateContext, any[]>(
  FileActionEnums.SET_ARCHIVE,
  (archFiles: any[]) => ({ archFiles })
);

export const getArchFileAction = createAction(
  FileActionEnums.GET_ARCHIVED_FILES,
  (archFiles: any[]) => ({ archFiles })
);

export const getGrantedAction = createAction(
  FileActionEnums.GET_GRANTED_USERS,
  (grantedUsers: any[]) => ({ grantedUsers })
);
