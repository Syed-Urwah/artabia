"use client";
import { getPayload, logout } from "@/enviroment/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const Header = ({ userType, setUserType, userDetails, setUserDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const router = useRouter();
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const { locales } = useRouter();
  const intl = useIntl();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const payload = getPayload();
    setLoginUser(payload);
    setIsLogin(!!payload);
  }, [path]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout(setUserDetails, setUserType, "/login", router);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };
  const handleLanguageSelect = () => {
    setIsOpen(false); // Close the dropdown when a language is selected
  };
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-16 py-2.5 shadow-lg">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="/img/artibia_logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center lg:order-2 gap-12">
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
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-bold gap-10 lg:flex-row lg:space-x-8 lg:mt-0">
              {loginUser.user_type === "artist" ? (
                <>
                  <li>
                    <Link href="/artist/artist_dashboard">
                      <div className="nav-item">
                        {intl.formatMessage({ id: "DASHBOARD" })}
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/artist/artwork">
                      <div className="nav-item">
                        {intl.formatMessage({ id: "ARTISTS" })}
                      </div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/" className="nav-item" aria-current="page">
                      {intl.formatMessage({ id: "Shop" })}
                    </Link>
                  </li>
                  <li>
                    <Link href="/order_history">
                      <div className="nav-item">
                        {intl.formatMessage({ id: "Order History" })}
                      </div>
                    </Link>
                  </li>
                </>
              )}
              {!isLogin ? (
                <li>
                  <Link href="/login" className="nav-item">
                    {intl.formatMessage({ id: "login" })}
                  </Link>
                </li>
              ) : (
                <li>
                  <a onClick={handleLogout} className="nav-item">
                    {intl.formatMessage({ id: "Logout" })}
                  </a>
                </li>
              )}
              <div>
                {/* Language dropdown */}
                {isOpen && (
                  <div>
                    {[...locales].sort().map((locale) => (
                      <Link
                        key={locale}
                        href={
                          loginUser.user_type === "artist"
                            ? `/${locale}/artist/artist_dashboard`
                            : `/${locale}`
                        }
                      >
                        <div
                          className="nav-item"
                          onClick={handleLanguageSelect}
                        >
                          {locale}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {/* Language dropdown toggle button */}
                <button onClick={toggleDropdown} className="nav-item">
                  {intl.formatMessage({ id: "Select Language" })}
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
