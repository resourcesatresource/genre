import React from "react";

const InputText = ({
  value = "",
  label = "",
  type = "text",
  onChange = (text) => {},
  required = false,
}) => {
  return (
    <div className="form-row mb-3">
      {label && (
        <label htmlFor="input" className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        name="input"
        id="input"
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        className="form-control"
        required={required}
      />
    </div>
  );
};

export default InputText;
