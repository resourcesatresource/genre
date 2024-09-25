import { createContext, useContext } from "react";

export const UserContext = createContext({
  authenticateUser: () => {},
  logout: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};
