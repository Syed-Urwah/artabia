import { useRouter } from "next/router";

import { Buffer } from "buffer";

export const setLocalToken = (token) => {
  // Check if window is defined (browser environment)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem("artabia-token", token);
  }
};

export const getLocalToken = () => {
  // Check if window is defined (browser environment)
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem("artabia-token");
  }
};

export const getPayload = () => {
  const token = getLocalToken();

  console.log(token);
  if (!token) return;
  const splitToken = token.split(".");
  if (splitToken.length !== 3) return;
  return JSON.parse(Buffer.from(splitToken[1], "base64"));
};

export const userIsAuthenticated = () => {
  const payload = getPayload();
  if (!payload) return;
  const currentTime = Math.round(Date.now() / 1000);
  const expTimeInSecond = 60 * 60; 
  const oneHourFromNow = currentTime + expTimeInSecond;
  return currentTime < oneHourFromNow;
};

export const getUserType = () => {
  if (!getPayload()) return "guest";
  return getPayload().user_type;
};

export const checkIsEnglishInStorage = () => {
  let langInStorage = window.localStorage.getItem("artabia-isEnglish");
  if (!langInStorage) {
    window.localStorage.setItem("artabia-isEnglish", true);
    langInStorage = window.localStorage.getItem("artabia-isEnglish");
  }
  return JSON.parse(langInStorage);
};

export const userTypesAllowedOnPage = (type, typesAllowed, navigateTo = -1) => {
  const router = useRouter();
  const allowed = typesAllowed.some((typeAllowed) => typeAllowed === type);
  if (!allowed) {
    router.push(navigateTo);
  }
};

export const logout = (setUserDetails, setUserType, navigateTo, router) => {
  try {
    console.log("Logging out...");
    window.localStorage.removeItem("artabia-token");
    setUserDetails({});
    setUserType(getUserType());
    console.log(router);
    router.push(navigateTo);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

