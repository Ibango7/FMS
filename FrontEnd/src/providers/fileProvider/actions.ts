import { IstateContext } from "./context";
import { createAction } from "redux-actions";

export const FileActionEnums = {
  UPLOAD_FILE: "UPLOAD_FILE",
  DOWNLOAD_FILE: "DOWNLOAD_FILE",
  DELETE_FILE: "DELETE_FILE",
  GET_FILE: "GET_FILES",
  SET_LOADER: "LOADER",
};

export const upLoadFileAction = createAction<IstateContext, any[]>(FileActionEnums.UPLOAD_FILE,(file) => ({ file }));
export const getFileAction = createAction(FileActionEnums.GET_FILE, (userFiles:any[])=>({userFiles}));
export const deleteFileAction = createAction(FileActionEnums.GET_FILE, (file:any)=>({file}));
export const loadFileAction = createAction<IstateContext>(FileActionEnums.GET_FILE,()=>({loading:true}));
export const loadDoneFileAction = createAction<IstateContext>(FileActionEnums.GET_FILE,
()=>({loading:false}));