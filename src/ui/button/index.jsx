import React from "react";
import Spinner from "../spinner";

const Button = ({
  mode = "primary",
  onClick = () => {},
  disabled = false,
  isLoading = false,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn-${mode}`}
      disabled={disabled}
    >
      {children}
      <Spinner active={isLoading} marginLeft="sm" marginRight="none" />
    </button>
  );
};

export default Button;
