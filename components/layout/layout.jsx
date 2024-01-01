"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { getPayload, getUserType, userIsAuthenticated } from "@/pages/enviroment/auth";

const Layout = ({ children }) => {

  const [userType, setUserType] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  useLayoutEffect(() => {
    const checkUserType =  getUserType();
    setUserType(checkUserType);
    if(checkUserType === 'artist')
    {
      if (userIsAuthenticated()) {
        const payload = getPayload();
        setUserDetails(payload);
      } else {
        const payload = getPayload();
        if (!payload) {
          router.push("/login");
          return;
        }
      }
     
    }
   
   
  }, [])

  return (
    <div>
      
      <Header userType={userType} setUserType={setUserType} userDetails={userDetails} setUserDetails={setUserDetails} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
