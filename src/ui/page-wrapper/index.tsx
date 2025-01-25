import React, { FC } from "react";

import Loader from "../loader";
import Portal from "../styled-component/portal";

const PageWrapper: FC<{
  isLoading?: boolean;
  children?: React.ReactNode;
}> = ({ isLoading = false, children }) => {
  return (
    <div className="container my-4">
      {isLoading ? (
        <Portal isVisible={isLoading}>
          <Loader isLoading={isLoading}></Loader>{" "}
        </Portal>
      ) : (
        children
      )}
    </div>
  );
};

export default PageWrapper;
