import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const setTokenExpiration = (token: string): void => {
  //const expirationTime = new Date().getTime() + expiresIn * 1000;
  const decoded: JwtPayload = jwtDecode(token);
  const expiration: number | undefined = decoded.exp;
  console.log("Expiration time", expiration);

  // localStorage.setItem("tokenExpiration", expirationTime.toString());
  Cookies.set("tokenExpiration", expiration!.toString(), {
    expires: expiration! / 86400,
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
