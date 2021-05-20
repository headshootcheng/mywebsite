/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef } from "react";
import styles from "./Experience.module.scss";

const Experience = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className={styles.experienceWrapper} ref={ref}></div>;
});

export default Experience;
