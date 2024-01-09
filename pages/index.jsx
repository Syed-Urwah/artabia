import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "./customer";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPayload, getUserType } from "../enviroment/auth";
// import Dashboard from "./artist_dashboard";

import Login from "./login";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ children }) {
  const [userType, setUserType] = useState("");
  const router = useRouter();

  useLayoutEffect(() => {
    const checkUserType = getUserType();
    setUserType(checkUserType);
    console.log(checkUserType);

    if (checkUserType === "artist") {
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
    router.push("/customer");
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
