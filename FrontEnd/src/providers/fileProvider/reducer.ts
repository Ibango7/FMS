import { handleActions } from "redux-actions";
import { FileActionEnums } from "./actions";

export const FileReducer = handleActions(
  {
    [FileActionEnums.UPLOAD_FILE]: (state, action) => {
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
    [FileActionEnums.GET_ARCHIVED_FILES]: (state, action) => {
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
        return {
          ...state,
          ...action.payload,
        };
      },
      [FileActionEnums.GET_USERS]: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
      [FileActionEnums.GET_SHARED_FILES]: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
      [FileActionEnums.GET_GRANTED_USERS]: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
  },
  {}
);
