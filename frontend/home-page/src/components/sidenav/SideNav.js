import React from "react";
import styles from "./SideNav.module.css";

const SideNav = (props) => {
  return (
    <div className={styles["sidenav"]}>
      <ul class="list-group">
        <li class="list-group-item">
          <u>Edit User Profile</u>
        </li>
        <li class="list-group-item">
          <u>Remote Viewing</u>
        </li>
        <li class="list-group-item">
          <u>Calendar</u>
        </li>
      </ul>
    </div>
  );
};
export default SideNav;
