import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "./customer";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPayload, getUserType } from "../enviroment/auth";
// import Dashboard from "./artist_dashboard";

import Login from "./login";
import Hero from "@/components/landing/hero";
import Offer from "@/components/landing/offer";
import About from "@/components/landing/about";
import Explore from "@/components/landing/explore";
import Gallery from "@/components/landing/gallery";
import Link from "next/link";
import { useLocalization } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ children, dir }) {
  const [userType, setUserType] = useState("");
  const { locale, getDirection } = useLocalization();
  const direction = getDirection(locale);
  const router = useRouter();
  // useLayoutEffect(() => {
  //   const checkUserType = getUserType();
  //   setUserType(checkUserType);
  //   console.log(checkUserType);

  //   if (checkUserType === "artist") {
  //     const payload = getPayload();
  //     if (!payload) {
  //       router.push("/login");
  //       return;
  //     }
  //   }
  // }, []);

  // let content;

  // console.log("child", children);
  // if (userType === 'artist') {
  //   // content = children ? children : <HomePage />;
  //   router.push("/artist/artist_dashboard");
  // } else if (userType === 'user') {
  //   router.push("/customer");
  //   // content = children ? children : <Main />;
  // }
  // else {
  //   content = children ? children : <Login />;
  // }

  // <link rel="icon" href="/favicon.ico" hrefLang="x-default" />
  // <link rel="icon" href="/favicon.ico" hrefLang="en" />
  // <link rel="icon" href="/favicon.ico" hrefLang="ar" />

  return (
    <>
      <main dir={direction} className="bg-white">
        {/* <Header /> */}
        {/* {content} */}
        <Header />
        <Hero />
        <Offer />
        <About />
        <Explore />
        <Gallery />
        <Footer />
      </main>
    </>

  );
}
