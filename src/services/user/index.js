import { createContext, useContext } from "react";

export const UserContext = createContext({
  authenticateUser: (user) => {},
  logout: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};
