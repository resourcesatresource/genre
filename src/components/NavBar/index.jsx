import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Logout from "../Logout";
import { PAGES, TABS } from "../../constants/navigation";
import Dropdown from "../../ui/dropdown";
import { useAuthContext } from "../../store";
import {
  getIconForTabs,
  getNavigationDropdownOptions,
  STRINGS,
} from "./helpers";
import Icon from "../../ui/icon";
import configs from "../../configs";

const UserGreeting = ({ userId = "", isAdmin, isSuperAdmin }) => {
  return (
    <div className="container d-flex">
      {userId && (
        <section className="container ps-0 text-primary-emphasis fw-medium">
          {STRINGS.userGreeting.title.replace("{{userId}}", userId)}
          {isAdmin ? (
            <span className="ms-2 btn btn-info btn-sm text-white fw-bold">
              {STRINGS.userGreeting.role.admin}
            </span>
          ) : (
            <span className="ms-2 btn btn-secondary btn-sm text-white fw-bold">
              {STRINGS.userGreeting.role.user}
            </span>
          )}
        </section>
      )}
      <Dropdown
        options={getNavigationDropdownOptions({ isAdmin, isSuperAdmin })}
      />
    </div>
  );
};

const NavTab = ({ title, target, activeTab }) => {
  return (
    <Link
      to={target}
      className={`col mx-2 d-flex align-items-center justify-content-center text-center text-decoration-none btn ${
        activeTab === target ? "btn-success" : ""
      }`}
    >
      <Icon name={getIconForTabs(title)} /> &nbsp; {title}
    </Link>
  );
};

function NavBar() {
  const { pathname } = useLocation();
  const { email, isAuthenticated, isAdmin, name } = useAuthContext();
  const [activeTab, setActiveTab] = useState(pathname);

  const isSuperAdmin = email === configs.SUPER_ADMIN_EMAIL;

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

      {isAuthenticated && activeTab === PAGES.HOME && (
        <UserGreeting
          userId={name ?? email}
          isAdmin={isAdmin}
          isSuperAdmin={isSuperAdmin}
        />
      )}
    </>
  );
}

export default NavBar;
