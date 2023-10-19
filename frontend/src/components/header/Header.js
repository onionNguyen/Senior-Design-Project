import React from "react";
import styles from "./Header.module.css";
import mainLogo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <h1>uARexpert</h1>
      <div className={styles["left-aligned"]}>
        <div id="logo">
          <img src={mainLogo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Header;
