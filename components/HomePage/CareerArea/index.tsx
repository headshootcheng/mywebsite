/** @jsxImportSource @emotion/react */
import React from "react";
import styles from "./Career.module.css";
import { CareerData } from "../../../types/HomeContent";
import CareerTimeline from "./CareerTimeline";

interface Props {
  data: CareerData;
}

const CareerArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [isReveal, setIsReveal] = React.useState<boolean>(false);
  if (!data.enabled) return null;
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
  }, []);
  return (
    <div
      className={styles.careerWrapper}
      css={{ backgroundColor: `${data.backgroundColor}` }}
      ref={ref}
    >
      <span className={styles.header}>{data.title}</span>
      <div className={styles.timelineContainer}>
        <CareerTimeline careerList={data.infos} isReveal={isReveal} />
      </div>
    </div>
  );
});

CareerArea.displayName = "CareerArea";

export default CareerArea;
