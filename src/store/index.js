import { useCookies } from "react-cookie";

/*
    This will fetch the data from the cookies
*/
export const useAuthContext = () => {
  const [userContext, _] = useCookies();

  return {
    email: userContext.user,
    authToken: userContext.token,
    isAdmin: userContext.isAdmin === "true",
    isAuthenticated: !!userContext.token,
  };
};
