import React from "react";
import ClassNames from "classnames";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import style from "./CareerTimeline.module.scss";
import Paper from "@mui/material/Paper";
import WorkIcon from "@mui/icons-material/Work";
interface Props {
  careerList: CareerInfo[];
  isReveal: boolean;
}

const CareerTimeline: React.FC<Props> = ({ careerList = [], isReveal }) => {
  return (
    <Timeline position="right">
      {careerList.map((career, index) => {
        return (
          <TimelineItem
            key={career.jobTitle}
            sx={{ transitionDelay: `${index / 2}s` }}
            className={ClassNames([
              style["timeline-item"],
              {
                [style["timeline-item_active"]]: isReveal,
              },
            ])}
          >
            <TimelineSeparator>
              <TimelineDot
                className={style.timelineDot}
                color={career.isCurrent ? "secondary" : "grey"}
              />
              {index !== careerList.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper className={style.contentBox}>
                <span className={style.jobTitle}>{career.jobTitle}</span>
                <div className={style.companyRow}>
                  <WorkIcon />
                  <span className={style.companyName}>
                    {career.companyName}
                  </span>
                </div>
                <span className={style.date}>{`${career.fromDate} - ${
                  career.toDate ? career.toDate : "Current"
                }`}</span>
                <ul className={style.explanationPointList}>
                  {career.description.split("\n").map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ul>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default CareerTimeline;
