import {handleActions } from "redux-actions";
import { AuthActionEnums } from "./actions";

export const authReducer = handleActions({
    [AuthActionEnums.USER_LOGIN]:(state, action) => {
        
        console.log("Login  state....",state);
        console.log("Login payload...",action.payload);

        return {
            ...state,
            ...action.payload
            }
    },
    [AuthActionEnums.USER_LOGOUT]: (state, action) =>{
        return {};
    }
}, {});