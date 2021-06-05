import React from "react";
import styles from "./MobileNavBar.module.scss";
import nav from "../../model/Nav";
import ClassName from "classnames";
interface Props {
  navList: nav[];
  currentPage: string;
  height: number;
}
const MobileNavBar: React.FC<Props> = ({
  navList,
  currentPage,
  height = 80,
}) => {
  return (
    <div className={styles.topbar} style={{ top: `calc(${height}px - 80px)` }}>
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
