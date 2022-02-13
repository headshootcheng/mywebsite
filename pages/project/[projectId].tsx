import React from "react";
import Head from "next/head";
import styles from "./project.module.scss";
import { useRouter } from "next/router";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import useSWR from "swr";
import Loading from "../../components/Loading";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GitHubIcon from "@mui/icons-material/GitHub";
interface Props {
  // data: projectdetail;
  // error: string;
}
const ProjectDetail: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: project } = useSWR<ProjectDetailRes>(
    `/projects/${router.query.projectId}?populate[0]=projectTechs&populate[1]=ProjectDescriptions&populate[2]=ProjectImages.image&populate[3]=previewImage`
  );

  const goToCodeLink = (link: string) => {
    window.open(link);
  };

  const goBackToPrevPage = () => {
    router.replace("/#Project");
  };

  return (
    <>
      <Head>
        <title>{project?.data.attributes.ProjectTitle || "Loading"}</title>
      </Head>
      {!project ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <Button
            sx={{
              outline: "none",
            }}
            color="inherit"
            startIcon={
              <ArrowBackIosIcon fontSize="large" className={styles.backIcon} />
            }
            onClick={goBackToPrevPage}
          >
            <span className={styles.backText}>Back</span>
          </Button>
          <div className={styles.mainArea}>
            <div className={styles.projectIntroArea}>
              <span className={styles.projectTitle}>
                {project.data.attributes.ProjectTitle}
              </span>
              <ul className={styles.explanationPointList}>
                {(project.data.attributes.ProjectDescriptions || []).map(
                  (item) => {
                    return <li key={item.id}>{item.content}</li>;
                  }
                )}
              </ul>

              <div className={styles.projectField}>
                <span className={styles.projectFieldName}>Date :</span>
                <span className={styles.projectFieldValue}>
                  {`${project.data.attributes.startDate} - ${
                    project.data.attributes?.endDate ?? "Current"
                  }`}
                </span>
              </div>

              <div className={styles.projectField}>
                <span className={styles.projectFieldName}>Tech :</span>
                <span className={styles.projectFieldValue}>
                  {project.data.attributes.projectTechs
                    .map((tech) => tech.content)
                    .join(" , ")}
                </span>
              </div>

              <div className={styles.projectField}>
                <span className={styles.projectFieldName}>Code :</span>
                <IconButton
                  sx={{
                    outline: "none",
                  }}
                  className={styles.codeButton}
                  onClick={() => goToCodeLink(project.data.attributes.codeUrl)}
                >
                  <GitHubIcon
                    fontSize="large"
                    sx={{
                      height: 40,
                      width: 40,
                      color: "white",
                    }}
                  />
                </IconButton>
              </div>
            </div>
            <ImageGallery
              projectList={project.data.attributes.ProjectImages}
              parentStyle={styles.imageGallery}
            />
          </div>
        </div>
      )}
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const { projectList } = await import("../../data/project");
//     const pathList = projectList.map(({ id }) => ({
//       params: {
//         projectId: id,
//       },
//     }));
//     return {
//       fallback: false,
//       paths: pathList,
//     };
//   } catch (err) {
//     return {
//       fallback: true,
//       paths: [],
//     };
//   }
// };

// interface Params extends ParsedUrlQuery {
//   projectId: string;
// }

// export const getStaticProps: GetStaticProps<
//   { data: projectdetail } | { error: string },
//   Params
// > = async (context) => {
//   const { projectId } = context.params || { projectId: "" };
//   try {
//     const { data } = await import(`../../data/${projectId}`);
//     return {
//       props: { data },
//     };
//   } catch (error) {
//     return {
//       props: { error: "error" },
//     };
//   }
// };
export default ProjectDetail;
