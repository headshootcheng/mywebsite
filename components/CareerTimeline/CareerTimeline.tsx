import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineContent from "@material-ui/lab/TimelineContent";
import style from "./CareerTimeline.module.scss";
import Paper from "@material-ui/core/Paper";
import WorkIcon from "@material-ui/icons/Work";
import careerinfo from "../../model/CareerInfo";
interface Props {
  careerList: careerinfo[];
}

const CareerTimeline = ({ careerList = [] }: Props) => {
  return (
    <Timeline align="left">
      {careerList.map(({ title, company, date, duties }, index) => {
        return (
          <TimelineItem key={title}>
            <TimelineSeparator>
              <TimelineDot
                className={style.timelineDot}
                color={index === 0 ? "secondary" : "grey"}
              />
              {index !== careerList.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper className={style.contentBox}>
                <span className={style.jobTitle}>{title}</span>
                <div className={style.companyRow}>
                  <WorkIcon />
                  <span className={style.companyName}>{company}</span>
                </div>
                <span className={style.date}>{date}</span>
                <ul className={style.explanationPointList}>
                  {duties.map((item) => {
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
