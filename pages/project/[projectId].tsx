import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import projectdetail from "../../model/ProjectDetail";
import Head from "next/head";
import styles from "./project.module.scss";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRouter } from "next/router";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import { ParsedUrlQuery } from "querystring";
interface Props {
  data: projectdetail;
  error: string;
}
const ProjectDetail: React.FC<Props> = (props) => {
  const router = useRouter();
  const myGitHubLink = "https://github.com/headshootcheng";
  const [projectDetail, setProjectDetail] = useState<projectdetail>(props.data);
  const goToCodeLink = () => {
    window.open(projectDetail?.gitHub || myGitHubLink);
  };

  const goBackToPrevPage = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{projectDetail?.title || "Updating"}</title>
      </Head>
      <div className={styles.wrapper}>
        <Button
          style={{
            outline: "none",
          }}
          color="inherit"
          startIcon={
            <ArrowBackIcon fontSize="large" className={styles.backIcon} />
          }
          onClick={goBackToPrevPage}
        >
          <span className={styles.backText}>Back</span>
        </Button>
        <div className={styles.mainArea}>
          <div className={styles.projectIntroArea}>
            <span className={styles.projectTitle}>
              {projectDetail?.title || ""}
            </span>
            <ul className={styles.explanationPointList}>
              {(projectDetail?.explanation || []).map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>

            <div className={styles.projectField}>
              <span className={styles.projectFieldName}>Date :</span>
              <span className={styles.projectFieldValue}>
                {projectDetail?.date || ""}
              </span>
            </div>

            <div className={styles.projectField}>
              <span className={styles.projectFieldName}>Tech :</span>
              <span className={styles.projectFieldValue}>
                {projectDetail?.tech.join(" , ") || ""}
              </span>
            </div>

            <div className={styles.projectField}>
              <span className={styles.projectFieldName}>Code :</span>
              <IconButton
                style={{
                  outline: "none",
                }}
                className={styles.codeButton}
                onClick={goToCodeLink}
              >
                <GitHubIcon
                  fontSize="large"
                  style={{
                    height: 40,
                    width: 40,
                    color: "white",
                  }}
                />
              </IconButton>
            </div>
          </div>
          <ImageGallery
            onClickSlide={() => {}}
            projectList={projectDetail?.detail}
            parentStyle={styles.imageGallery}
          />
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

interface Params extends ParsedUrlQuery {
  projectId: string;
}

export const getStaticProps: GetStaticProps<
  { data: projectdetail } | { error: string },
  Params
> = async (context) => {
  const { projectId } = context.params || { projectId: "" };
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
