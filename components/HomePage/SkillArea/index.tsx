/** @jsxImportSource @emotion/react */
import { Divider, Rating } from "@mui/material";
import React from "react";
import ClassNames from "classnames";
import { SkillData } from "../../../types/HomeContent";
import styles from "./Skill.module.css";
interface Props {
  data: SkillData;
}

const SkillArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  if (!data.enabled) return null;
  const [isReveal, setIsReveal] = React.useState<boolean>(false);

  if (!data.enabled) return null;
  React.useEffect(() => {
    const handleScroll = () => {
      if (
        typeof ref !== "function" &&
        ref?.current?.offsetTop &&
        window.scrollY > ref?.current?.offsetTop - 350
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
      css={{ backgroundColor: `${data.backgroundColor}` }}
      className={styles.skillWrapper}
      ref={ref}
    >
      <span className={styles.header}>{data.title}</span>
      {data.SkillTypes.map(({ type }, index) => (
        <div
          css={{ transitionDelay: `${index / 2}s` }}
          className={ClassNames([
            styles.skillArea,
            { [styles["skillArea_active"]]: isReveal },
          ])}
          key={type}
        >
          <span className={styles.subHeader}>{type}</span>
          <div className={styles.skillRow}>
            {data.SkillInfos.filter(
              (skillInfo) => skillInfo.skillType === type
            ).map(({ rating, skillTitle }) => (
              <div className={styles.skillItem} key={skillTitle}>
                <span className={styles.skillText}>{skillTitle}</span>
                <Rating defaultValue={rating} size="medium" readOnly />
              </div>
            ))}
          </div>
          {index !== data.SkillTypes.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
});

SkillArea.displayName = "SkillArea";
export default SkillArea;
