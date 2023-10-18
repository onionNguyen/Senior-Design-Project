import React from "react";
import styles from "./Form.module.css";

const Input = ({ label, type, name, value, onChange, required }) => {
  const countryCodes = [
    { code: "+1", country: "United States" },
    { code: "+44", country: "United Kingdom" },
    { code: "+61", country: "Australia" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
    { code: "+91", country: "India" },
    { code: "+52", country: "Mexico" },
    { code: "+55", country: "Brazil" },
    { code: "+1", country: "Canada" },
    { code: "+7", country: "Russia" },
    { code: "+82", country: "South Korea" },
    { code: "+34", country: "Spain" },
    { code: "+39", country: "Italy" },
  ];

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
          {countryCodes.map((item, index) => (
            <option key={index} value={item.code}>
              {item.country} ({item.code})
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
