/** @jsxImportSource @emotion/react */
import React from "react";
import ClassNames from "classnames";
import { ProfileData } from "../../../types/HomeContent";
import styles from "./Profile.module.css";
interface Props {
  data: ProfileData;
}
const ProfileArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [isReveal, setIsReveal] = React.useState<boolean>(false);

  if (!data.enabled) return null;
  React.useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (
        typeof ref !== "function" &&
        ref?.current?.offsetTop &&
        window.scrollY > 0
      )
        setIsReveal(true);
      else setIsReveal(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={ref}
      css={{ backgroundColor: `${data.backgroundColor}` }}
      className={styles.profileWrapper}
    >
      <span className={styles.header}>{data.title}</span>
      <div
        className={ClassNames([
          styles.introArea,
          { [styles.introArea_active]: isReveal },
        ])}
      >
        <div className={styles.iconArea}>
          <img
            className={styles.icon}
            src={data.profileImage.data.attributes.url}
          />
        </div>
        <div className={styles.textArea}>
          <span className={styles.introText}>{data.myIntro}</span>
        </div>
      </div>
    </div>
  );
});
ProfileArea.displayName = "ProfileArea";
export default ProfileArea;
