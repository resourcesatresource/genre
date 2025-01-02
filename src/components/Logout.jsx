import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import Icon from "../ui/icon";

const Logout = () => {
  const [_, setCookies] = useCookies();
  const navigate = useNavigate();
  const { openToast } = useToast();

  const handleLogout = () => {
    setCookies("token", "");
    setCookies("user", "");
    setCookies("isAdmin", "");
    setCookies("id", "");
    setCookies("name", "");
    navigate("/");
    openToast("Logged out...", "error");
  };

  return (
    <div
      onClick={handleLogout}
      className="col mx-2 d-flex align-items-center justify-content-center btn btn-danger"
    >
      <Icon name="right-from-bracket" /> &nbsp; Logout
    </div>
  );
};

export default Logout;
