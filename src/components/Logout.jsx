import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Logout() {
  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  function handleLogout() {
    setCookies("token", "");
    setCookies("user", "");
    navigate("/");
    toast.error("Logged out...", {
      autoClose: 1500,
    });
    setTimeout(() => {
      location.reload();
    }, 2500);
  }
  return (
    <div onClick={handleLogout} className="col btn btn-danger">
      Logout
    </div>
  );
}

export default Logout;
