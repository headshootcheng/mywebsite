/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import styles from "./Profile.module.scss";

const Profile = forwardRef((props, ref: React.ForwardedRef<HTMLDivElement>) => {
  return <div className={styles.profileWrapper} ref={ref}></div>;
});

export default Profile;
