/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef } from "react";
import styles from "./Project.module.scss";

const Project = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className={styles.projectWrapper} ref={ref}></div>;
});

export default Project;
