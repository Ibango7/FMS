import { createContext } from "react";
export interface IstateContext {
  file?: any[];
  userFiles?: any[];
  sharedFiles?: any[];
  archFiles?: any[];
  loading?: boolean;
  grantedUsers?: any[];
  users?: any[];
  permission?: any[];
  archive?:boolean;
}

export interface FilePermissionDto {
  CanView: boolean;
  CanEdit: boolean;
  CanDelete: boolean;
  CanDownload: boolean;
  CanSign: boolean;
  RequestedUsers: number[];
  FileId: string;
  OwnerId?: string;
  FileOwnerId:number;
}

export interface IActionContext {
  uploadFile?: (file: any, userId: number) => Promise<any>;
  downloadfile?: (finename: string) => Promise<any>;
  deletefile?: (fileName: string, userId:number) => Promise<any>;
  getFiles?: (userId: number) => Promise<any>;
  renameFile?: (newFileName:string, oldFileName:string, userId:number) => Promise<any>;
  getEmails?: () => Promise<any>;
  addPermission?: (filePermission: FilePermissionDto) => Promise<any>;
  getSharedFiles?: (userId:number) => Promise<any>;
  getArchFiles?:(userId:number) => Promise<any>;
  SetArchFile?:(FileId:string,flag:boolean) => Promise<any>;
  getGrantedUsers?:(userId: number) => Promise<any>;
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
