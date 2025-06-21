/** @jsxImportSource @emotion/react */
import { Divider } from "@mui/material";
import React from "react";
import ClassNames from "classnames";
import styles from "./Skill.module.css";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
interface Props {
  data: SkillData;
}

const SkillArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [observerRef, isVisible] = useIntersectionObserver();
  React.useImperativeHandle(ref, () => observerRef.current as HTMLDivElement);

  if (!data.isEnabled) return null;

  const typeList = Array.from(new Set(data.items.map((item) => item.type)));
  return (
    <div className={styles.skillWrapper} ref={observerRef}>
      <span className={styles.header}>{data.sectionName}</span>
      {typeList.map((type, index) => (
        <div
          css={{ transitionDelay: `${index / 2}s` }}
          className={ClassNames([
            styles.skillArea,
            { [styles["skillArea_active"]]: isVisible },
          ])}
          key={type}
        >
          <span className={styles.subHeader}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          <div className={styles.skillRow}>
            {data.items
              .filter((skillInfo) => skillInfo.type === type)
              .map(({ name }) => (
                <div className={styles.skillItem} key={name}>
                  <span className={styles.skillText}>{name}</span>
                </div>
              ))}
          </div>
          {index !== typeList.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
});

SkillArea.displayName = "SkillArea";
export default SkillArea;
