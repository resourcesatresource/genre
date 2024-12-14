import { PAGES } from "../../constants/navigation";

export const getNavigationDropdownOptions = ({ isAdmin = false }) => {
  return [
    {
      title: "Profile",
      navigateTo: PAGES.PROFILE,
    },
  ];
};
