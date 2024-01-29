"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { getPayload, getUserType, userIsAuthenticated } from "@/enviroment/auth";
import { useLocalization } from "@/pages/_app";

const ArtistLayout = ({ children }) => {

  const [userType, setUserType] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { locale, getDirection } = useLocalization();
  const direction = getDirection(locale);

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
      // setUserType(payload.user_type)

      if(payload.user_type !== 'artist'){
        router.push('/customer')
        // alert("not a artist")
      }
    } else {
      const payload = getPayload();
      if (!payload) {
        router.push("/login");
        // return;
      }

      
    }

    setLoading(false);
  },[])

  return (
    loading ? 'loading' :
  
    <div dir={direction}>
      <Header userType={userType} setUserType={setUserType} userDetails={userDetails} setUserDetails={setUserDetails} />
      {children}
      <Footer />
    </div>
  
  );
};

export default ArtistLayout;
