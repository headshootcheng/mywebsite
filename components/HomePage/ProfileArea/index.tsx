/** @jsxImportSource @emotion/react */
import React from "react";
import ClassNames from "classnames";
import styles from "./Profile.module.css";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

interface Props {
  data: ProfileData;
}

const ProfileArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [observerRef, isVisible] = useIntersectionObserver();

  // Combine refs - must be called before any early returns
  React.useImperativeHandle(ref, () => observerRef.current as HTMLDivElement);

  if (!data.isEnabled) return null;

  return (
    <section
      ref={observerRef}
      className={styles.profileWrapper}
      aria-labelledby="profile-header"
    >
      <h2 id="profile-header" className={styles.header}>
        {data.sectionName}
      </h2>
      <div
        className={ClassNames([
          styles.introArea,
          { [styles.introArea_active]: isVisible },
        ])}
      >
        <div className={styles.iconArea}>
          <img
            className={styles.icon}
            src={data.image}
            alt="Profile photo"
            loading="lazy"
          />
        </div>
        <div className={styles.textArea}>
          <p className={styles.introText}>{data.text}</p>
        </div>
      </div>
    </section>
  );
});
ProfileArea.displayName = "ProfileArea";
export default ProfileArea;
