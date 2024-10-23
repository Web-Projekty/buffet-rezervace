import Cookies from "js-cookie";

export const setTokenExpiration = (expiresIn: number): void => {
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  console.log("Expiration time", expirationTime);

  // localStorage.setItem("tokenExpiration", expirationTime.toString());
  Cookies.set("tokenExpiration", expirationTime.toString(), {
    expires: expiresIn / 86400,
  });
};

export const isTokenExpired = (): boolean => {
  // const expirationTime = localStorage.getItem("tokenExpiration");
  const expirationTime = Cookies.get("tokenExpiration");
  if (!expirationTime) return true;

  return new Date().getTime() > parseInt(expirationTime, 10);
};

export const removeTokenExpiration = (): void => {
  // localStorage.removeItem("tokenExpiration");
  Cookies.remove("tokenExpiration");
};
