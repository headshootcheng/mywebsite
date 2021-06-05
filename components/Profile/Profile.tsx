/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import styles from "./Profile.module.scss";

interface Props {
  image: string;
  introText: string;
}
const Profile = forwardRef<HTMLDivElement, Props>(
  ({ image = "", introText = "" }, ref) => {
    return (
      <div className={styles.profileWrapper} ref={ref}>
        <span className={styles.header}>Profile</span>
        <div className={styles.introArea}>
          <div className={styles.iconArea}>
            <img className={styles.icon} src={image} />
          </div>
          <div className={styles.textArea}>
            <span className={styles.introText}>{introText}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default Profile;
