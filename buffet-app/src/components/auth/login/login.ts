import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const setTokenExpiration = (token: string): void => {
  //const expirationTime = new Date().getTime() + expiresIn * 1000;
  const decoded: JwtPayload = jwtDecode(token);
  const expirationTime: number | undefined = decoded.exp;
  console.log("Expiration time", expirationTime);
  if (!expirationTime) return;
  Cookies.set("tokenExpiration", expirationTime.toString(), {
    expires: expirationTime / 86400,
  });
};

export const isTokenExpired = (): boolean => {
  // const expirationTime = localStorage.getItem("tokenExpiration");
  const expirationTime = Cookies.get("tokenExpiration");
  console.log("Expiration time", expirationTime);
  console.log("Current time", new Date().getTime());
  if (!expirationTime) return true;

  return new Date().getTime() > parseInt(expirationTime, 10) * 1000;
};

export const removeTokenExpiration = (): void => {
  // localStorage.removeItem("tokenExpiration");
  Cookies.remove("tokenExpiration");
};
