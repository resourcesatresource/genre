import { useCookies } from "react-cookie";

/*
    This will fetch the data from the cookies
*/
export const useAuthContext = () => {
  const [userContext, _] = useCookies();

  return {
    name: userContext.name,
    email: userContext.user,
    authToken: userContext.token,
    id: userContext.id,
    isAdmin: userContext.isAdmin === "true",
    isAuthenticated: !!userContext.token,
  };
};
