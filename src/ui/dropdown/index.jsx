import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ title = "", options = [] }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-sm dropdown-toggle fw-bold"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        More
      </button>
      <ul className="dropdown-menu dropdown-menu-light">
        {options.map((option, index) => {
          return (
            <li key={index}>
              <Link
                to={option.navigateTo}
                className="dropdown-item text-decoration-none fw-medium"
              >
                {option.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
