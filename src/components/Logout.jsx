import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const [_, setCookies] = useCookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies("token", "");
    setCookies("user", "");
    setCookies("isAdmin", "");
    setCookies("id", "");
    setCookies("name", "");
    navigate("/");
    toast.error("Logged out...", {
      autoClose: 1500,
    });
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
