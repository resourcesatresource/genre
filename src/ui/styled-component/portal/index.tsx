import React, { ReactNode } from "react";

import "./styles.css";

const Portal: React.FC<{ isVisible?: boolean; children: ReactNode }> = ({
  isVisible = false,
  children,
}) => {
  return <>{isVisible ? <div className="portal">{children}</div> : <></>}</>;
};

export default Portal;
