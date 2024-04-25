import React from 'react';
import { AuthProvider } from '@/providers/authProvider';
// import RegisterUserProvider from '../registerProvider';
// import UserProvider from '../userProfileProvider';

interface AppProvidersProps {
    children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <AuthProvider>
                {/* <RegisterUserProvider> */}
                        {children}
                {/* </RegisterUserProvider> */}
        </AuthProvider>
    );
};

export default AppProviders;
