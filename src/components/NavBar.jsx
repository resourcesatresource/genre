import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";
import { useCookies } from "react-cookie";
import { useGet } from "../hooks/use-https";
import { GET_ADMIN_STATUS } from "../constants/api-endpoints";
import TABS from "../constants/navigation";

const UserGreeting = ({ userEmailId = "", isAdmin }) => {
  return (
    <>
      {userEmailId && (
        <section className="container text-primary-emphasis fw-medium">
          {`Hello, ${userEmailId}`}
          {isAdmin ? (
            <span className="ms-2 btn btn-info btn-sm text-white fw-bold">
              Admin
            </span>
          ) : (
            <span className="ms-2 btn btn-secondary btn-sm text-white fw-bold">
              User
            </span>
          )}
        </section>
      )}
    </>
  );
};

const NavTab = ({ title, target, activeTab }) => {
  return (
    <Link
      to={target}
      className={`col mx-2 text-center text-decoration-none btn ${
        activeTab === target ? "btn-success" : ""
      }`}
    >
      {title}
    </Link>
  );
};

function NavBar() {
  const { pathname } = useLocation();
  const [cookies, setCookies] = useCookies(["token", "user", "isAdmin"]);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState(pathname);

  const { execute, data } = useGet(GET_ADMIN_STATUS, {
    lazy: true,
    sendAuthToken: true,
  });

  useEffect(() => {
    if (pathname) {
      setActiveTab(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (cookies.user) {
      execute(GET_ADMIN_STATUS.replace(":id", cookies.user));
    }
  }, [cookies.user]);

  useEffect(() => {
    if (cookies.user) {
      setUsername(cookies.user);
    }
  }, [cookies.user]);

  useEffect(() => {
    if (data?.isAdmin) {
      setCookies("isAdmin", true);
      return;
    }
  }, [data]);

  return (
    <>
      <nav className="container mt-2 mb-2">
        <div className="row">
          <NavTab title="Home" target={TABS.HOME} activeTab={activeTab} />
          {cookies.token ? (
            <>
              <NavTab
                title="Add"
                target={TABS.ADD_GENRE}
                activeTab={activeTab}
              />
              <Logout />
            </>
          ) : (
            <>
              <NavTab title="Login" target={TABS.LOGIN} activeTab={activeTab} />
              <NavTab
                title="Register"
                target={TABS.REGISTER}
                activeTab={activeTab}
              />
            </>
          )}
        </div>
        <hr className="border border-secondary border opacity-25"></hr>
      </nav>

      {cookies.token && (
        <UserGreeting userEmailId={username} isAdmin={cookies?.isAdmin} />
      )}
    </>
  );
}

export default NavBar;
