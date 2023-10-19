import React from "react";
import styles from "./Form.module.css";

const IndicatesRequired = () => {
  return (
    <div>
      <span className={styles["required"]}>* </span>
      <span>Indicates Required</span>
    </div>
  );
};

export default IndicatesRequired;
