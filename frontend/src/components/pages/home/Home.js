import React, { useState } from "react";
import SideNav from "../../sidenav/SideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Home.module.css";

const Home = () => {
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

export default Home;
