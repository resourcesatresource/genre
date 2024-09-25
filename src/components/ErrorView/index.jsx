import React from "react";

import { getUIDetailsBasedOnMode } from "./helpers";

const ErrorView = ({ error = "", mode, children }) => {
  const uiInfo = getUIDetailsBasedOnMode(mode);

  if (!error) {
    return <></>;
  }

  return (
    <div
      className={`container border ${uiInfo.border} ${uiInfo.background} mt-4`}
    >
      <div className="text-center p-1 fw-normal">{error}</div>
      {children}
    </div>
  );
};

export default ErrorView;
