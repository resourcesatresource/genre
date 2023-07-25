import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useCookies } from "react-cookie";
function NavBar() {
  const [cookies, _] = useCookies(["token", "user"]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (cookies.user) {
      setUsername(cookies.user);
    }
  });
  return (
    <>
      <nav className="container mt-2 mb-2">
        <div className="row">
          <Link to={"/"} className="col text-center text-decoration-none btn">
            Home
          </Link>
          <Link
            to={"/create"}
            className="col text-center text-decoration-none btn"
          >
            Add
          </Link>
          {cookies.token ? (
            ""
          ) : (
            <Link
              to={"/login"}
              className="col text-center text-decoration-none btn"
            >
              Login
            </Link>
          )}
          {cookies.token ? (
            ""
          ) : (
            <Link
              to={"/register"}
              className="col text-center text-decoration-none btn"
            >
              Register
            </Link>
          )}
          {cookies.token ? <Logout /> : ""}
        </div>
        {/* <hr className="border border-secondary border opacity-25"></hr> */}
      </nav>
      {username ? (
        <section className="container text-success">{`Hello, ${username}`}</section>
      ) : (
        ""
      )}
    </>
  );
}

export default NavBar;
