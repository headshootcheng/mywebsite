/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef } from "react";
import styles from "./Skill.module.scss";

const Skill = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className={styles.skillWrapper} ref={ref}></div>;
});

export default Skill;
