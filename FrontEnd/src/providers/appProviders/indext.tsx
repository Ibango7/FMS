import React from "react";
import { AuthProvider } from "@/providers/authProvider";
import FileProvider from "../fileProvider";
import RegisterUserProvider from "../registerProvider";
// import UserProvider from '../userProfileProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <RegisterUserProvider>
        <FileProvider>{children}</FileProvider>
      </RegisterUserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
