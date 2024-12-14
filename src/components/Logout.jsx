import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

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
    setTimeout(() => {
      location.reload();
    }, 2500);
  };

  return (
    <div onClick={handleLogout} className="col mx-2 btn btn-danger">
      Logout
    </div>
  );
};

export default Logout;
