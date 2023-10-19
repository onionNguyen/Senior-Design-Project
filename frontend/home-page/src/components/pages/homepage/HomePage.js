import React, { useState } from "react";
import SideNav from "../../sidenav/SideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import Input from "../../form/Input";
import styles from "./HomePage.module.css";
import IndicatesRequired from "../../form/IndicatesRequired";
import MessageRibbon from "../../form/MessageRibbon";
const HomePage = () => {
  return (
    <div>
      <Header />
      <SideNav>
        <div className={styles["form-container"]}>
          <div className={styles["form-sub-container"]}></div>
        </div>
        <div className={styles["button-ribbon"]}></div>
      </SideNav>
      <Footer />
    </div>
  );
};

export default HomePage;
