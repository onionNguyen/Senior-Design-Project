import React from "react";
import styles from "./Form.module.css";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  countryCodes,
}) => {
  return (
    <>
      <label className={styles["display-block"]} htmlFor={name}>
        {required && <span className={styles["required"]}>* </span>}
        {label}
      </label>
      {type === "select" && (
        <select
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e)}
          required={required}
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          {countryCodes.map((countryCode, index) => (
            <option key={index} value={countryCode.code}>
              {countryCode.name} ({countryCode.code})
            </option>
          ))}
        </select>
      )}
      {(type === "text" || type === "email" || type === "password") && (
        <input
          className={styles["display-block"]}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e)}
          required={required}
        />
      )}
    </>
  );
};

export default Input;
