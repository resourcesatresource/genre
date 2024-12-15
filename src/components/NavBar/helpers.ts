import { PAGES } from "../../constants/navigation";
import { TABS } from "../../constants/screens";

export const getNavigationDropdownOptions = ({ isAdmin = false }) => {
  return [
    {
      title: "Profile",
      icon: "circle-user",
      navigateTo: PAGES.PROFILE,
    },
  ];
};

const TAB_ICON_MAP = {
  [TABS.HOME]: "home",
  [TABS.CREATE]: "square-plus",
  [TABS.LOGIN]: "user",
  [TABS.REGISTER]: "user-plus",
};

export const getIconForTabs = (name = "") => {
  return TAB_ICON_MAP[name];
};

export const STRINGS = {
  userGreeting: {
    title: "Hello, {{userId}}",
    role: {
      user: "User",
      admin: "Admin",
    },
  },
};
