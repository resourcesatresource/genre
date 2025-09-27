import React from "react";
import { useCookies } from "react-cookie";

import { UserContext } from "../../services/user";

const COOKIES_KEYS = ["token", "user", "isAdmin", "_id", "name", "username"];

const UserProvider = ({ children }) => {
  const [_, setCookies, removeCookies] = useCookies(COOKIES_KEYS);

  const authenticateUser = (userData) => {
    COOKIES_KEYS.forEach((key) => {
      if (userData[key] != undefined || userData[key] != null) {
        setCookies(key, userData[key], {
          path: "/",
        });
      }
    });
  };

  const logout = () => {
    COOKIES_KEYS.forEach((key) => removeCookies(key));
  };

  return (
    <UserContext.Provider value={{ authenticateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
