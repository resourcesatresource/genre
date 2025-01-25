import React from "react";

const InputText = ({
  value = "",
  label = "",
  type = "text",
  onChange = (text) => {},
  required = false,
  onBlur = () => {},
  error = "",
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
        onBlur={onBlur}
      />
      {error && <label className="text-danger">{error}</label>}
    </div>
  );
};

export default InputText;
