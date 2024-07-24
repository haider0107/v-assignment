import TMAPI from "./TMAPI";

export const registerService = (registerData) => {
  return TMAPI.post("/auth/register", registerData);
};

export const loginService = (loginData) => {
  return TMAPI.post("/auth/login", loginData);
};

export const logoutUser = () => {
  return TMAPI.post("/auth/logout");
};

export const getCurrentUser = () => {
  return TMAPI.get("/auth/currentUser");
};
