/** @jsxImportSource @emotion/react */
import React from "react";
import styles from "./Welcome.module.css";
interface Props {
  data: WelcomeArea;
}

const WelcomeArea: React.FC<Props> = ({ data }) => {
  if (!data.enabled) return null;
  return (
    <div
      css={{
        backgroundImage: `url(${data.backgroundImage.image.data.attributes.url})`,
        position: "relative",
      }}
      className={styles.welcomeWrapper}
    >
      <div
        css={{
          position: "absolute",
          backgroundColor: `${data.backgroundImage.overlayColor}`,
          opacity: 0.5,
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
      />
      <div className={styles.titleArea}>
        <span className={styles.title}>{data.title}</span>
      </div>
      <div className={styles.subtitleArea}>
        <span className={styles.subtitle}>{data.subtitle}</span>
      </div>
    </div>
  );
};

export default WelcomeArea;