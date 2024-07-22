import { useCookies } from "react-cookie";
import { ROLES } from "../../constants";
import { useAuthContext } from "../../store";

const FeatureAccess = ({ allowed = "", children }) => {
  const { isAuthenticated, isAdmin } = useAuthContext();
  if (!isAuthenticated) {
    return null;
  }

  if (allowed === ROLES.USER) {
    return children;
  }

  if (allowed === ROLES.ADMIN) {
    return isAdmin ? children : null;
  }

  return null;
};

export default FeatureAccess;
