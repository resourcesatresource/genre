import { useCookies } from "react-cookie";
import { ROLES } from "../../constants";

const FeatureAccess = ({ allowed = "", children }) => {
  const [userContext, _] = useCookies();
  if (!userContext?.token) {
    return null;
  }

  if (allowed === ROLES.USER) {
    return children;
  }

  if (allowed === ROLES.ADMIN) {
    const isAdmin = userContext?.isAdmin === "true";
    return isAdmin ? children : null;
  }

  return null;
};

export default FeatureAccess;
