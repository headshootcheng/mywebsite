/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef } from "react";
import styles from "./Skill.module.scss";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";
import { skillinfo } from "../../utils/globalInterface";
interface Props {
  skillList: skillinfo[];
}
const Skill = forwardRef(
  ({ skillList }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={styles.skillWrapper} ref={ref}>
        <span className={styles.header}>Skill</span>
        {(skillList || []).map(({ type, detail }, index) => {
          return (
            <div className={styles.skillArea} key={type}>
              <span className={styles.subHeader}>{type}</span>
              <div className={styles.skillRow}>
                {detail.map(({ name, rating }) => {
                  return (
                    <div className={styles.skillItem} key={name}>
                      <span className={styles.skillText}>{name}</span>
                      <Rating defaultValue={rating} size="medium" readOnly />
                    </div>
                  );
                })}
              </div>
              {index !== skillList.length - 1 && <Divider />}
            </div>
          );
        })}
      </div>
    );
  }
);

export default Skill;
