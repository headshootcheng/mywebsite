import React from "react";
import styles from "./MobileNavBar.module.scss";
const MobileNavBar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarRow}>
        <div>
          <span className={styles.topbarOptionText}>Profile</span>
        </div>
        <div>
          <span className={styles.topbarOptionText}>Experience</span>
        </div>
        <div>
          <span className={styles.topbarOptionText}>Skill</span>
        </div>
        <div>
          <span className={styles.topbarOptionText}>Project</span>
        </div>
        <div>
          <span className={styles.topbarOptionText}>Contact</span>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
