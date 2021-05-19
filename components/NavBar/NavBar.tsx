import React from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import IconButton from "@material-ui/core/IconButton";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.navButtonWrapper}>
        <IconButton
          style={{ outline: "none" }}
          className={styles.navButton}
          disableFocusRipple={true}
          disableRipple
        >
          <KeyboardArrowUpIcon style={{ color: "white" }} fontSize="large" />
        </IconButton>
      </div>
      <div className={styles.navBox}>
        <span className={styles.navBoxText}>Profile</span>
      </div>
      <div className={styles.navBoxActive}>
        <span className={styles.navBoxText}>Experience</span>
      </div>
      <div className={styles.navButtonWrapper}>
        <IconButton
          style={{ outline: "none" }}
          className={styles.navButton}
          disableFocusRipple={true}
          disableRipple
        >
          <KeyboardArrowDownIcon style={{ color: "white" }} fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default NavBar;
