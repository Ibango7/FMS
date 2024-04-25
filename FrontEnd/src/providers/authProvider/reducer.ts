import {handleActions } from "redux-actions";
import { AuthActionEnums } from "./actions";

export const authReducer = handleActions({
    [AuthActionEnums.USER_LOGIN]:(state, action) => {
        return {
            ...state,
            ...action.payload
            }
    },
    [AuthActionEnums.USER_LOGOUT]: (state, action) =>{
        return {};
    }
}, {});