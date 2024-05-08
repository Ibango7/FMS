import { IstateContext } from './context';
import { LoginPayload } from './context';
import {createAction} from 'redux-actions';

export const AuthActionEnums = {
    USER_LOGIN: "LOGIN",
    USER_LOGOUT: "LOGOUT",
    LOADING_USER: "LOADING_USER"
}

export const loginUserAction = createAction<IstateContext,LoginPayload>(AuthActionEnums.USER_LOGIN, (userInfo)=>({userInfo}));
export const logOutUserAction = createAction(AuthActionEnums.USER_LOGOUT, ()=>({}));
export const loadLoginAction = createAction<IstateContext>(
    AuthActionEnums.LOADING_USER,
    () => ({ loadingLogin: true })
  );
  export const loadDoneLoginAction = createAction<IstateContext>(
    AuthActionEnums.LOADING_USER,
    () => ({ loadingLogin: false })
  );
