"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { getPayload, getUserType, userIsAuthenticated } from "@/pages/enviroment/auth";

const ArtistLayout = ({ children }) => {

  const [userType, setUserType] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
//   useLayoutEffect(() => {
//     const checkUserType =  getUserType();
//     setUserType(checkUserType);
//     if(checkUserType === 'artist')
//     {
      
     
//     }
    
   
   
//   }, [])

  useEffect(()=>{
    // console.log(getPayload())
    if (userIsAuthenticated()) {
      const payload = getPayload();
      console.log(payload.user_type)
      setUserDetails(payload);

      if(payload.user_type !== 'artist'){
        router.push('/main')
        // alert("not a artist")
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

export default ArtistLayout;
