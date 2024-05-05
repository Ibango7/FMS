'use client';
import React, {ComponentType, useState, useEffect,FC} from "react";
import { useRouter } from 'next/navigation';
import { useLogin } from "@/providers/authProvider";
import { checkUser } from "@/app/home/layout";
export interface WithAuthProps {wrappedComponent: any;}

// eslint-disable-next-line react/display-name
const withAuth =<P extends object>(WrappedComponent: ComponentType<P>): FC<P> => (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // State to track loading status
    const {userInfo} = useLogin();
    const isLoggedIn = userInfo?.isLoggedIn;

    useEffect(() => {
      if (checkUser()){
        setLoading(false);
      }else {
        setLoading(true);
        router.push('/login');
       
        } 
      }, [isLoggedIn,router,userInfo]);

    return (<> 
          {(loading) ? <span></span>/* Render loading indicator here*/ : <WrappedComponent {...props} />  }
    </>);
}

export default withAuth;