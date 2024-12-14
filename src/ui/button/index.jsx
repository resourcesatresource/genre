import React from "react";

const Button = ({ mode = "primary", onClick, children }) => {
  return (
    <div onClick={onClick} className={`btn btn-${mode}`}>
      {children}
    </div>
  );
};

export default Button;
