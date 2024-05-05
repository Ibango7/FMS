import { createContext } from "react";

export interface IstateContext {
  file?: any[];
  userFiles?: any[];
  loading?: boolean;
}

export interface IActionContext {
  uploadFile?: (file: any, userId: number) => Promise<any>;
  downloadfile?: (finename: string) => Promise<any>;
  deletefile?: (fileName: string, userId:number) => Promise<any>;
  getFiles?: (userId: number) => Promise<any>;
  renameFile?: (newFileName:string, oldFileName:string, userId:number) => Promise<any>
}

export const FILE_CONTEXT_INITIAL_STATE: IstateContext = {
  file: [],
  userFiles: [],
  loading: false
};
export const FileStateContext = createContext<IstateContext>(
  FILE_CONTEXT_INITIAL_STATE
);

export const FileActionContext = createContext<IActionContext>({} as any);
