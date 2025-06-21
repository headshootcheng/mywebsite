import React, { useCallback } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import styles from "./NavBar.module.scss";
import ClassName from "classnames";

interface Props {
  navList: nav[];
  currentPage: string;
}

const NavBar: React.FC<Props> = React.memo(({ navList, currentPage }) => {
  const scrollToNextItem = useCallback(() => {
    const currentIndex = navList.findIndex(
      ({ title }) => title === currentPage
    );
    if (currentIndex >= 0 && currentIndex < navList.length - 1) {
      navList[currentIndex + 1].onTrigger();
    }
  }, [navList, currentPage]);

  const scrollToPrevItem = useCallback(() => {
    const currentIndex = navList.findIndex(
      ({ title }) => title === currentPage
    );
    if (currentIndex > 0 && currentIndex <= navList.length - 1) {
      navList[currentIndex - 1].onTrigger();
    }
  }, [navList, currentPage]);

  return (
    <nav 
      className={styles.navBar}
      role="navigation"
      aria-label="Page navigation"
    >
      <div className={styles.navButtonWrapper}>
        <IconButton
          onClick={scrollToPrevItem}
          className={styles.navButton}
          disableFocusRipple={true}
          disableRipple
          aria-label="Go to previous section"
          tabIndex={0}
        >
          <KeyboardArrowUpIcon style={{ color: "white" }} fontSize="large" />
        </IconButton>
      </div>
      {navList.map(({ title, onTrigger }) => {
        const isActive = title === currentPage;
        return (
          <button
            className={ClassName(styles.navBox, {
              [styles.navBoxActive]: isActive,
            })}
            key={title}
            onClick={onTrigger}
            aria-label={`Navigate to ${title} section`}
            aria-current={isActive ? "page" : undefined}
            tabIndex={0}
          >
            <span className={styles.navBoxText}>{title}</span>
          </button>
        );
      })}
      <div className={styles.navButtonWrapper}>
        <IconButton
          onClick={scrollToNextItem}
          className={styles.navButton}
          disableFocusRipple={true}
          disableRipple
          aria-label="Go to next section"
          tabIndex={0}
        >
          <KeyboardArrowDownIcon style={{ color: "white" }} fontSize="large" />
        </IconButton>
      </div>
    </nav>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
