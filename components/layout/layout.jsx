"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  getPayload,
  getUserType,
  userIsAuthenticated,
} from "@/enviroment/auth";
import { useLocalization } from "@/pages/_app";

const Layout = ({ children }) => {
  const [userType, setUserType] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { locale, getDirection } = useLocalization();
  const direction = getDirection(locale);

  useEffect(() => {
    console.log(getPayload());
    if (userIsAuthenticated()) {
      const payload = getPayload();
      setUserType(payload.user_type);
      console.log(payload.user_type);
      setUserDetails(payload);

      if (payload.user_type !== "user") {
        router.push("/artist/artist_dashboard");
      }
    } else {
      const payload = getPayload();
      if (!payload) {
        router.push("/login");
        // return;
      }
    }

    setLoading(false);
  }, []);

  return loading ? (
    "loading"
  ) : (
    <div dir={direction} className="overflow-x-hidden">
      <Header
        userType={userType}
        setUserType={setUserType}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
