import React from "react";

import { theme, ThemeContext } from "../../theme";

/*
  TODO: Soon I will implement a better way to
  access the theme object throughout the repo.
*/
const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
