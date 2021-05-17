import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { projectdetail } from "../../utils/globalInterface";
import Head from "next/head";
import styles from "./project.module.scss";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  data: projectdetail;
  error: string;
}
const ProjectDetail = (props: Props) => {
  const myGitHubLink = "https://github.com/headshootcheng";
  const [projectDetail, setProjectDetail] = useState<projectdetail>(
    props.data || {}
  );
  const goToCodeLink = () => {
    window.open(projectDetail?.gitHub || myGitHubLink);
  };

  return (
    <>
      <Head>
        <title>{projectDetail?.title || "Updating"}</title>
      </Head>
      <div className={styles.projectDetailWrapper}>
        <ImageGallery
          projectList={projectDetail?.detail || []}
          onClickSlide={() => {}}
        />
        <div className={styles.projectContent}>
          {/* Date */}
          <div className={styles.projectContentRow}>
            <span className={styles.projectContentTitle}>Date :</span>
            <span className={styles.projectContentText}>
              {projectDetail?.date || ""}
            </span>
          </div>
          {/* Code Link */}
          <div className={styles.projectContentRow}>
            <span className={styles.projectContentTitle}>Code :</span>
            <IconButton style={{ outline: "none" }} onClick={goToCodeLink}>
              <GitHubIcon
                className={styles.githubIcon}
                style={{ fontSize: 50, color: "white" }}
              />
            </IconButton>
          </div>
          {/* Explanation  */}
          <div className={styles.projectContentRow}>
            <ul className={styles.projectContentPointList}>
              {(projectDetail?.explanation || []).map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </div>
          {/* Technology */}
          <div className={styles.projectContentRow}>
            <span className={styles.projectContentTitle}>Technology :</span>
            <span className={styles.projectContentText}>
              {projectDetail?.tech.join(" , ") || ""}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { projectList } = await import("../../data/project");
    const pathList = projectList.map(({ id }) => ({
      params: {
        projectId: id,
      },
    }));
    return {
      fallback: false,
      paths: pathList,
    };
  } catch (err) {
    return {
      fallback: true,
      paths: [],
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { projectId } = context.params;
  try {
    const { data } = await import(`../../data/${projectId}`);
    return {
      props: { data },
    };
  } catch (err) {
    return {
      props: { error: err.message },
    };
  }
};
export default ProjectDetail;
