/** @jsxImportSource @emotion/react */
import React from "react";
import styles from "./Career.module.css";
import CareerTimeline from "./CareerTimeline";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

interface Props {
  data: CareerData;
}

const CareerArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [observerRef, isVisible] = useIntersectionObserver();
  // Combine refs - must be called before any early returns
  React.useImperativeHandle(ref, () => observerRef.current as HTMLDivElement);

  if (!data.isEnabled) return null;
  return (
    <div className={styles.careerWrapper} ref={observerRef}>
      <span className={styles.header}>{data.sectionName}</span>
      <div className={styles.timelineContainer}>
        <CareerTimeline careerList={data.items} isReveal={isVisible} />
      </div>
    </div>
  );
});

CareerArea.displayName = "CareerArea";

export default CareerArea;
