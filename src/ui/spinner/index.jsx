import React from "react";

const Spinner = ({ active = false }) => {
  return active ? (
    <span
      className="spinner-border spinner-border-sm me-2"
      aria-hidden="true"
    ></span>
  ) : (
    <></>
  );
};

export default Spinner;
