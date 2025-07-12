import React from "react";
import Spinner from "../spinner";
import Icon from "../icon";

const Button = ({
  type = "button",
  mode = "primary",
  onClick = () => {},
  disabled = false,
  isLoading = false,
  icon = "",
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${mode} ${props.size ? `btn-${props.size}`: ""}`}
      disabled={disabled}
    >
      <div className="d-flex align-items-center">
        {icon && <Icon name={icon} marginRight={children ? "sm" : "none"} />}
        {children}
        <Spinner active={isLoading} marginLeft={children ? "sm" : "none"} />
      </div>
    </button>
  );
};

export default Button;
