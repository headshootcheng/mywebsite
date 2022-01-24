import React from "react";
import styles from "./loading.module.css";
const Loading = () => {
  return (
    <div className={styles["loading"]}>
      <div className={styles["loading_content"]} />
      <img src="itdog.gif" className={styles["loading_image"]} />
      <span className={styles["loading_text"]}>Loading</span>
    </div>
  );
};

export default Loading;
