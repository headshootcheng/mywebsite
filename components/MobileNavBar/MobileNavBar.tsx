import React from "react";
import styles from "./MobileNavBar.module.scss";
import { nav } from "../../utils/globalInterface";
import ClassName from "classnames";
interface Props {
  navList: nav[];
  currentPage: string;
}
const MobileNavBar = ({ navList, currentPage }: Props) => {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarRow}>
        {navList.map(({ title, onPress }) => {
          return (
            <div
              className={ClassName(styles.topbarOptionBox, {
                [styles.topbarOptionBoxActive]: title === currentPage,
              })}
              onClick={onPress}
              key={title}
            >
              <span className={styles.topbarOptionText}>{title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavBar;
