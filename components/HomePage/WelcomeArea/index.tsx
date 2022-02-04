/** @jsxImportSource @emotion/react */
import React from "react";
import { WelcomeData } from "../../../types/HomeContent";
import styles from "./Welcome.module.css";
interface Props {
  data: WelcomeData;
}
const WelcomeArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  if (!data.enabled) return null;
  return (
    <div
      ref={ref}
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
        <span className={styles.title}>{data.headerTitle}</span>
      </div>
      <div className={styles.subtitleArea}>
        <span className={styles.subtitle}>{data.headerSubtitle}</span>
      </div>
    </div>
  );
});
WelcomeArea.displayName = "WelcomeArea";
export default WelcomeArea;
