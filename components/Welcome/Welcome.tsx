/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import styles from "./Welcome.module.scss";

const Welcome = forwardRef((props, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={styles.welcomeWrapper} ref={ref}>
      <div className={styles.colorWrapper}>
        <div className={styles.titleArea}>
          <span className={styles.title}>Peter Cheng</span>
        </div>
        <div className={styles.subtitleArea}>
          <span className={styles.subtitle}>My Personal Profilio</span>
        </div>
      </div>
    </div>
  );
});

export default Welcome;
