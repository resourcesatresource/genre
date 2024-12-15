import React from "react";

import { useTheme } from "../../theme";

/*
    TODO: Support for colors will be added soon
*/
const Icon = ({
  type = "solid",
  name = "hourglass",
  size = 16,
  onClick = () => {},
  marginRight = "none",
}) => {
  const theme = useTheme();
  return (
    <div
      onClick={onClick}
      className={`me-${theme.spacing[marginRight] ?? theme.spacing.none}`}
    >
      <i
        className={`fa-${type} fa-${name}`}
        style={{
          fontSize: `${size}px`,
        }}
      ></i>
    </div>
  );
};

export default Icon;
