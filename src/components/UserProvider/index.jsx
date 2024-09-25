import React from "react";
import { useCookies } from "react-cookie";

import { UserContext } from "../../services/user";

const UserProvider = ({ children }) => {
  const [_, setCookies] = useCookies([
    "token",
    "user",
    "isAdmin",
    "id",
    "name",
  ]);

  const authenticateUser = (userData) => {
    setCookies("token", userData?.token);
    setCookies("user", userData?.email);
    setCookies("isAdmin", userData?.isAdmin);
    setCookies("id", userData?._id);
    setCookies("name", userData?.name);
  };

  const logout = () => {
    setCookies("token", "");
    setCookies("user", "");
    setCookies("isAdmin", "");
    setCookies("id", "");
    setCookies("name", "");
  };

  return (
    <UserContext.Provider value={{ authenticateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
