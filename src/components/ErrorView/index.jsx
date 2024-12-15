import React from "react";

import { getUIDetailsBasedOnMode } from "./helpers";
import { useTheme } from "../../theme";

const ErrorView = ({ error = "", mode, marginBottom = "none", children }) => {
  const theme = useTheme();
  const uiInfo = getUIDetailsBasedOnMode(mode);

  if (!error) {
    return <></>;
  }

  return (
    <div
      className={`container border ${uiInfo.border} ${uiInfo.background} mt-4 mb-${theme.spacing[marginBottom]}`}
    >
      <div className="text-center p-1 fw-normal">{error}</div>
      {children}
    </div>
  );
};

export default ErrorView;
