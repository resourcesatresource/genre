import React from "react";
import { useTheme } from "../../theme";

const Loader = ({ isLoading = false, marginVertical = "none" }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <div
          className={`d-flex justify-content-center my-${
            theme.spacing[marginVertical] ?? theme.spacing.none
          }`}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loader;
