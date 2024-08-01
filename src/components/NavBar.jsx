import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";
import TABS from "../constants/navigation";
import Dropdown from "../ui/dropdown";
import { useAuthContext } from "../store";

const DropdownOptions = [
  {
    title: "Profile",
    navigateTo: "/me",
  },
];

const UserGreeting = ({ userEmailId = "", isAdmin }) => {
  return (
    <div className="container d-flex">
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
      <Dropdown options={DropdownOptions} />
    </div>
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
  const { email, isAuthenticated, isAdmin, name } = useAuthContext();
  const [activeTab, setActiveTab] = useState(pathname);

  useEffect(() => {
    if (pathname) {
      setActiveTab(pathname);
    }
  }, [pathname]);

  return (
    <>
      <nav className="container mt-2 mb-2">
        <div className="row">
          <NavTab title="Home" target={TABS.HOME} activeTab={activeTab} />
          {isAuthenticated ? (
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

      {isAuthenticated && (
        <UserGreeting userEmailId={name ?? email} isAdmin={isAdmin} />
      )}
    </>
  );
}

export default NavBar;
