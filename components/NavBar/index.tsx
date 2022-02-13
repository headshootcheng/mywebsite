import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import styles from "./NavBar.module.scss";
import ClassName from "classnames";
interface Props {
  navList: nav[];
  currentPage: string;
}

const NavBar: React.FC<Props> = ({ navList, currentPage }) => {
  const scrollToNextItem = () => {
    const currentIndex = navList.findIndex(
      ({ title }) => title === currentPage
    );
    if (currentIndex >= 0 && currentIndex < navList.length - 1)
      navList[currentIndex + 1].onPress();
  };

  const scrollToPrevItem = () => {
    const currentIndex = navList.findIndex(
      ({ title }) => title === currentPage
    );
    if (currentIndex > 0 && currentIndex <= navList.length - 1)
      navList[currentIndex - 1].onPress();
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navButtonWrapper}>
        <IconButton
          onClick={scrollToPrevItem}
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
          onClick={scrollToNextItem}
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
