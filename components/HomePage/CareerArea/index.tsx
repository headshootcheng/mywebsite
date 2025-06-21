/** @jsxImportSource @emotion/react */
import React from "react";
import styles from "./Career.module.css";
import CareerTimeline from "./CareerTimeline";

interface Props {
  data: CareerData;
}

const CareerArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [isReveal, setIsReveal] = React.useState<boolean>(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (
        typeof ref !== "function" &&
        ref?.current?.offsetTop &&
        window.scrollY > ref?.current?.offsetTop - 150
      )
        setIsReveal(true);
      else setIsReveal(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  if (!data.isEnabled) return null;
  return (
    <div className={styles.careerWrapper} ref={ref}>
      <span className={styles.header}>{data.sectionName}</span>
      <div className={styles.timelineContainer}>
        <CareerTimeline careerList={data.items} isReveal={isReveal} />
      </div>
    </div>
  );
});

CareerArea.displayName = "CareerArea";

export default CareerArea;
