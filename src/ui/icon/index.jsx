import React from "react";

/*
    TODO: Support for colors will be added soon
*/
const Icon = ({
  type = "solid",
  name = "hourglass",
  size = 16,
  onClick = () => {},
  ...props
}) => {
  return (
    <div onClick={onClick}>
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
