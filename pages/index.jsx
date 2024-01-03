import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "./main";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPayload, getUserType } from "./enviroment/auth";

import Login from "./login";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ children }) {

  const [userType, setUserType] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    const checkUserType = getUserType();
    setUserType(checkUserType);
    console.log(checkUserType);

    if (checkUserType === 'artist') {
      const payload = getPayload();
      if (!payload) {
        router.push("/login");
        return;
      }
    }
  }, []);

  let content;

  console.log("child" , children);
  if (userType === 'artist') {
    // content = children ? children : <HomePage />;
    router.push("/artist/artist_dashboard");
  }else if(userType === 'user'){
    router.push("/main");
    // content = children ? children : <Main />;
  }
   else {
    content = children ? children : <Login />;
  }

  return (
    <main className="bg-white">
      {/* <Header /> */}
      {content}
      {/* <Login /> */}
      {/* <Footer /> */}
    </main>
  );
}
