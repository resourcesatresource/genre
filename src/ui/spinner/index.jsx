import React from "react";
import { useTheme } from "../../theme";

const Spinner = ({
  active = false,
  marginRight = "sm",
  marginLeft = "none",
}) => {
  const theme = useTheme();

  return active ? (
    <span
      className={`spinner-border spinner-border-sm me-${
        theme.spacing[marginRight] ?? theme.spacing.sm
      } ms-${theme.spacing[marginLeft] ?? theme.spacing.none}`}
      aria-hidden="true"
    ></span>
  ) : (
    <></>
  );
};

export default Spinner;
