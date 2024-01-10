"use client";
import { getPayload, logout } from "@/enviroment/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = ({ userType, setUserType, userDetails, setUserDetails }) => {
  console.log(userType);
  const router = useRouter();
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  // const payload = getPayload();
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  useEffect(()=>{
    const payload = getPayload();
    console.log(path);
    console.log(payload)
      if (!payload) {
        setIsLogin(false)
        // return;
      }else{
        setIsLogin(true);
      }

  },[path])

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logout");
    logout(setUserDetails, setUserType, "/login", router);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <header>
      <nav
        className="bg-white border-gray-200 px-4 lg:px-16 py-2.5 shadow-lg"
        style={{
          backgroundImage: `url("/img/backnav.png")`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="/img/artibia_logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center lg:order-2 gap-12">
            <div className="lighten-icon">
              <img
                src="/img/search.png"
                className="mr-2 h-5 w-5"
                alt="Search"
              />
            </div>
            <div className="lighten-icon">
              <img
                src="/img/icon_1.png"
                className="mr-2 h-5 w-5"
                alt="Subtract"
              />
            </div>
            {/* <div className="flex gap-1">
              <div className="flex items-center lighten-icon">
                <img src="/img/cart.png" className="h-5 w-5" alt="Cart" />
              </div>
              <span className="text-base font-bold text-gray-500">(0)</span>
            </div> */}
            <button
              onClick={handleMobileMenuToggle}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 ${isMobileMenuOpen ? "" : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`${isMobileMenuOpen ? "block" : "hidden"
              } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-bold gap-10 lg:flex-row lg:space-x-8 lg:mt-0">
              {userType === "artist" ? (
                <>
                  <li>
                    <Link href="/artist/artist_dashboard">
                      <div className="block py-2 pr-4 pl-3 text-black-700 border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">
                        DASHBOARD
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/artist/artwork">
                      <div className="block py-2 pr-4 pl-3 text-black-700 border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">
                        ARTISTS
                      </div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/"
                      className="block py-2 pr-4 pl-3 text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-900 lg:p-0 "
                      aria-current="page"
                    >
                      SHOP
                    </Link>
                  </li>
                  <li>

                    <Link href="/order_history">
                      <div className="block py-2 pr-4 pl-3 text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-900 lg:p-0 "
                        aria-current="page">

                        Order History
                      </div>
                    </Link>
                  </li>
                </>
              )}
              {/* <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-black-700 border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  SERVICES
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-black-700 border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  ART BLOGS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-black-700 border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  ABOUT
                </a>
              </li> */}
              {!isLogin ? (
                <li>
                  <Link
                    href="/login"
                    // onClick={handleLogin}
                    className="block py-2 pr-4 pl-3 text-black-700 border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                  >
                    login
                  </Link>
                </li>
              ) : (
                <li>
                  <a
                    onClick={handleLogout}
                    className="block py-2 pr-4 pl-3 text-black-700 border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
