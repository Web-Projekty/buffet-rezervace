export const setTokenExpiration = (): void => {
  const expiresIn = 10;
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  console.log("Expiration time", expirationTime);

  localStorage.setItem("tokenExpiration", expirationTime.toString());
};

export const isTokenExpired = (): boolean => {
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (!expirationTime) return true;

  return new Date().getTime() > parseInt(expirationTime, 10);
};
