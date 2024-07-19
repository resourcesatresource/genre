import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useCookies } from "react-cookie";
import { useGet } from "../hooks/use-https";
import { GET_ADMIN_STATUS } from "../constants/api-endpoints";

function NavBar() {
  const [cookies, _] = useCookies(["token", "user"]);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { execute, data } = useGet(GET_ADMIN_STATUS, {
    lazy: true,
    sendAuthToken: true,
  });

  useEffect(() => {
    if (cookies.user) {
      execute(GET_ADMIN_STATUS.replace(":id", cookies.user));
    }
  }, [cookies.user]);

  useEffect(() => {
    if (cookies.user) {
      setUsername(cookies.user);
    }
  });

  useEffect(() => {
    if (data?.isAdmin) {
      setIsAdmin(true);
    }
  }, [data]);

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
        <hr className="border border-secondary border opacity-25"></hr>
      </nav>
      {username ? (
        <section className="container text-primary-emphasis fw-medium">
          {`Hello, ${username}`}
          {isAdmin && (
            <span className="ms-2 btn btn-info btn-sm text-white fw-bold">
              Admin
            </span>
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default NavBar;
