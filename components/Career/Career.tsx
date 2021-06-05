/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import CareerTimeline from "../CareerTimeline/CareerTimeline";
import styles from "./Career.module.scss";
import careerinfo from "../../model/CareerInfo";
interface Props {
  careerList: careerinfo[];
}
const Career = forwardRef<HTMLDivElement, Props>(({ careerList = [] }, ref) => {
  return (
    <div className={styles.careerWrapper} ref={ref}>
      <span className={styles.header}>Career</span>
      <div className={styles.timelineContainer}>
        <CareerTimeline careerList={careerList} />
      </div>
    </div>
  );
});

export default Career;
