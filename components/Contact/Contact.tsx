/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef } from "react";
import styles from "./Contact.module.scss";

const Contact = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className={styles.contactWrapper} ref={ref}></div>;
});

export default Contact;
