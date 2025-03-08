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

/*export const setRefreshToken = (interval: number, token: string) => {
  setInterval(async () => {
    if (isTokenExpired()) {
      try {
        const { data } = await axios.post(FETCH_URL, {
          requestType: "verify",
          token: token,
        });
        console.log("Refreshed token", data);
        Cookies.set("token", data.newToken);
        setTokenExpiration(data.newToken as string);
      } catch (error) {
        console.error("Failed to refresh token", error);
        // Handle token refresh failure (e.g., log out the user)
      }
    }
  }, interval);
};
*/
