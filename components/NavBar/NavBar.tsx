import React from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import IconButton from "@material-ui/core/IconButton";
import styles from "./NavBar.module.scss";
import { nav } from "../../utils/globalInterface";
import ClassName from "classnames";
interface Props {
  navList: nav[];
  currentPage: string;
}

const NavBar = ({ navList, currentPage }: Props) => {
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
      {navList.map(({ title, onPress }) => {
        return (
          <div
            className={ClassName(styles.navBox, {
              [styles.navBoxActive]: title === currentPage,
            })}
            key={title}
            onClick={onPress}
          >
            <span className={styles.navBoxText}>{title}</span>
          </div>
        );
      })}
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
