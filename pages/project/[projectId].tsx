import React from "react";
import Head from "next/head";
import styles from "./project.module.scss";
import { useRouter } from "next/router";
import ImageGallery from "../../components/ImageGallery";
import useSWR from "swr";
import { Button, Card, IconButton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRecoilValue } from "recoil";
import projectListAtom from "../../statMgmt/projectList";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import axios, { AxiosResponse } from "axios";
import { ParsedUrlQuery } from "querystring";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: projectList }: AxiosResponse<ProjectListRes> =
      await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/projects?populate[0]=previewImage&populate[1]=ProjectImages.image`
      );
    const pathList = projectList.data.map(({ id }) => ({
      params: {
        projectId: id.toString(),
      },
    }));
    return {
      fallback: false,
      paths: pathList,
    };
  } catch (err) {
    return {
      fallback: false,
      paths: [],
    };
  }
};

interface Params extends ParsedUrlQuery {
  projectId: string;
}

export const getStaticProps: GetStaticProps<
  {
    projectRes: ProjectDetailRes;
  },
  Params
> = async (context) => {
  if (!context?.params)
    return {
      notFound: true,
    };
  const { projectId } = context.params;
  try {
    const { data: project }: AxiosResponse<ProjectDetailRes> = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/projects/${projectId}?populate[0]=projectTechs&populate[1]=ProjectDescriptions&populate[2]=ProjectImages.image&populate[3]=previewImage`
    );
    return {
      props: { projectRes: project },
      revalidate: 60 * 24 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const ProjectDetail = ({
  projectRes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { data: project } = useSWR<ProjectDetailRes>(
    `/projects/${router.query.projectId}?populate[0]=projectTechs&populate[1]=ProjectDescriptions&populate[2]=ProjectImages.image&populate[3]=previewImage`,
    {
      fallbackData: projectRes,
    }
  );

  const goToCodeLink = (link: string) => {
    window.open(link);
  };

  const goBackToPrevPage = () => {
    router.replace("/#Project");
  };
  if (!project) return null;
  const projectList = useRecoilValue(projectListAtom);

  return (
    <>
      <Head>
        <title>{project.data.attributes.ProjectTitle || "Loading"}</title>
      </Head>

      {router.query?.projectId &&
        parseInt(router.query.projectId.toString()) > 1 &&
        projectList.length > 0 && (
          <div
            className={styles.prevButton}
            onClick={() => {
              if (router.query?.projectId)
                router.push(
                  `/project/${parseInt(router.query.projectId?.toString()) - 1}`
                );
            }}
          >
            <ArrowBackIosIcon fontSize="large" sx={{ color: "white" }} />
          </div>
        )}
      {router.query?.projectId &&
        parseInt(router.query.projectId.toString()) < projectList.length &&
        projectList.length > 0 && (
          <div
            className={styles.nextButton}
            onClick={() => {
              if (router.query?.projectId)
                router.push(
                  `/project/${parseInt(router.query.projectId?.toString()) + 1}`
                );
            }}
          >
            <ArrowForwardIosIcon
              fontSize="large"
              sx={{ color: "white", marginLeft: "20px" }}
            />
          </div>
        )}
      <div className={styles.wrapper}>
        <Button
          sx={{
            outline: "none",
          }}
          color="inherit"
          startIcon={
            <ArrowBackIosIcon fontSize="medium" className={styles.backIcon} />
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
                <Stack direction="row" gap="5px" flexWrap={"wrap"}>
                  {project.data.attributes.projectTechs.map((tech, i) => (
                    <Card
                      key={i}
                      sx={{
                        padding: "10px",
                        width: "fit-content",
                        display: "flex",
                        backgroundColor: "orange",
                      }}
                    >
                      {tech.content}
                    </Card>
                  ))}
                </Stack>
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
    </>
  );
};

export default ProjectDetail;
