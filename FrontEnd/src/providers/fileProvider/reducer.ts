import { handleActions } from "redux-actions";
import { FileActionEnums } from "./actions";

export const FileReducer = handleActions(
  {
    [FileActionEnums.UPLOAD_FILE]: (state, action) => {
      // console.log("Upload file  state....",state);
      // console.log("Upload file payload...",action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    [FileActionEnums.GET_FILE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    [FileActionEnums.SET_LOADER]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    [FileActionEnums.DOWNLOAD_FILE]: (state, action) => {
        console.log("Download file  state....",state);
        console.log("Download file payload...",action.payload);
        return {
          ...state,
          ...action.payload,
        };
      },
  },
  {}
);
