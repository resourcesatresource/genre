import { createContext, useContext } from "react";

import { spacing, styles } from "./util";

export const theme = {
  spacing,
  styles,
};

export const ThemeContext = createContext(theme);

export const useTheme = () => {
  return useContext(ThemeContext);
};
