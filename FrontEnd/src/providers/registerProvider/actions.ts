import { IRegisterStateContext } from "./context";
import { createAction } from "redux-actions";
import { IRegister } from "./context";

export const actionType = {
    REGISTER_USER: "REGISTER_USER",
    LOADING_USER: "LOADING_REGISTER"
}

export const registerUserAction = createAction<IRegisterStateContext>(actionType.REGISTER_USER, ()=>({}));
export const loadRegisterAction = createAction<IRegisterStateContext>(
    actionType.LOADING_USER,
    () => ({ loadingRegister: true })
  );
  export const loadDoneRegisterAction = createAction<IRegisterStateContext>(
    actionType.LOADING_USER,
    () => ({ loadingRegister: false })
  );
