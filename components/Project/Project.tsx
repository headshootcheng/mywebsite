/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import styles from "./Project.module.scss";
import { projectdata } from "../../utils/globalInterface";
interface Props {
  projectList: projectdata[];
}

const Project = forwardRef(
  ({ projectList = [] }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={styles.projectWrapper} ref={ref}>
        <span className={styles.header}>Project</span>
        <div className={styles.projectListWrapper}>
          {projectList.map((item, index) => {
            return (
              <ProjectCard key={item?.title || index} projectData={item} />
            );
          })}
        </div>
      </div>
    );
  }
);

export default Project;
