/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef } from "react";
import styles from "./Contact.module.scss";
const Contact = forwardRef(
  ({ contactList = [] }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={styles.contactWrapper} ref={ref}>
        <span className={styles.header}>Contact</span>
        <div className={styles.contactRow}>
          {contactList.map(({ icon, type, onPress, link }) => {
            return (
              <div className={styles.contactItem} key={type} onClick={onPress}>
                {icon}
                <span className={styles.contactLink}>{link}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Contact;
