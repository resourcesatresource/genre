import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Icon from "../icon";

const Dropdown = ({ title = "", options = [] }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-sm dropdown-toggle fw-bold"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        &#8942;
      </button>
      <ul className="dropdown-menu dropdown-menu-light">
        {options.map((option, index) => {
          return (
            <li key={index}>
              <Link
                to={option.navigateTo}
                className="dropdown-item text-decoration-none fw-medium"
              >
                <div className="d-flex align-items-center">
                  {option.icon && (
                    <Icon name={option.icon} size={18} marginRight="sm" />
                  )}
                  {option.title}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
