/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import styles from "./Welcome.module.scss";

const Welcome = forwardRef((props, ref: React.ForwardedRef<HTMLDivElement>) => {
  return <div className={styles.welcomeWrapper} ref={ref}></div>;
});

export default Welcome;
