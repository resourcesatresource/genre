import React, { FC } from "react";

const PageWrapper: FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return <div className="container my-4">{children}</div>;
};

export default PageWrapper;
