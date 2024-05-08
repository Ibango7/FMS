"use client";
import React, {
  useReducer,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
  useContext,
} from "react";
import { loginUserAction, logOutUserAction } from "./actions";
import {
  LoginPayload,
  IAuthLogin,
  AuthActionContext,
  AuthStateContext,
  AUTH_CONTEXT_INITIAL_STATE,
  IAuthResponse,
} from "./context";
import { authReducer } from "./reducer";
import { loadLoginAction, loadDoneLoginAction } from "./actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notification, Alert } from "antd";
import { decodeToken } from "@/components/login/decode";

const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_CONTEXT_INITIAL_STATE);
  const [isInprogress, setIsInProgress] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const router = useRouter();

  // Effect to log state changes after dispatching loginUserAction
  useEffect(() => {}, [state]); // This effect runs whenever state changes

  useEffect(() => {
    // Load state from local storage if available
    /*const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        const storedEncryptedAccessToken = localStorage.getItem('encryptedAccessToken');
        
        if (storedToken && storedUserId && storedEncryptedAccessToken) {
            const payload: LoginPayload = {
                accessToken: storedToken,
                encryptedAccessToken: storedEncryptedAccessToken,
                userId: parseInt(storedUserId),
                isLoggedIn: true
            };
            dispatch(loginUserAction(payload));
        }*/
  }, []); // Run this effect only once when the component mounts

  const warningMessage = () => {
    notification.open({
      message: "Login user",
      description: (
        <Alert
          message="error"
          description="Invalid Email or password"
          type="error"
          showIcon
        />
      ),
    });
  };
  const login = (userInput: IAuthLogin): Promise<IAuthResponse> => {
    dispatch(loadLoginAction());
    return new Promise((resolve, reject) => {
      {
        axios
          .post("https://localhost:44311/api/TokenAuth/Authenticate", userInput)
          .then((response) => {
            setErrorLogin("");
            setIsInProgress(false);
            resolve(response.data);
            const { result } = response.data;
            const { accessToken, encryptedAccessToken, userId } = result;
            const payload: LoginPayload = {
              accessToken,
              encryptedAccessToken,
              userId,
              isLoggedIn: true,
            };

            dispatch(loginUserAction(payload));
            localStorage.setItem("token", accessToken);
            localStorage.setItem("userId", userId.toString());
            dispatch(loadDoneLoginAction());
          })
          .catch((e) => {
            setErrorLogin(e.message);
            warningMessage();
            dispatch(loadDoneLoginAction());
            // alert('Invalid Email or password');
          });
      }
    });
  };

  const logout = async () => {
    // console.log("Before dispacthing...")
    // dispatch(logOutUserAction());
    console.log(" in logOut");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
  //#endregion
  return (
    <AuthStateContext.Provider
      value={{
        ...state,
        isInProgress: { isInprogress },
        error: { errorLogin },
      }}
    >
      <AuthActionContext.Provider
        value={{
          login,
          logout,
        }}
      >
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(AuthStateContext);

  if (context == undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
    console.log("useAuthState must be used within a AuthProvider");
  }

  return context;
};

const useActionsContext = () => {
  const context = useContext(AuthActionContext);

  if (context == undefined) {
    throw new Error("useAuthActions must be used within a AuthProvider");
    console.log("useAuthActions must be used within a AuthProvider");
  }

  return context;
};

const useLogin = () => {
  return { ...useStateContext(), ...useActionsContext() };
};

export { useLogin, AuthProvider };
