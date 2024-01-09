"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { getPayload, getUserType, userIsAuthenticated } from "@/enviroment/auth";

const Layout = ({ children }) => {

  const [userType, setUserType] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(()=>{
    console.log(getPayload())
    if (userIsAuthenticated()) {
      const payload = getPayload();
      setUserType(payload.user_type0);
      console.log(payload.user_type)
      setUserDetails(payload);

      if(payload.user_type !== 'user'){
        router.push('/artist/artist_dashboard')
      }
    } else {
      const payload = getPayload();
      if (!payload) {
        router.push("/login");
        // return;
      }

      
    }
  },[])

  return (
    <div>
      
      <Header userType={userType} setUserType={setUserType} userDetails={userDetails} setUserDetails={setUserDetails} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
