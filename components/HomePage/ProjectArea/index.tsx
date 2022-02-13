/** @jsxImportSource @emotion/react */
import React from "react";
import ClassNames from "classnames";
import styles from "./Project.module.css";
import { ProjectData } from "../../../types/HomeContent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import useMobile from "../../../hooks/useMobile";
import { useRouter } from "next/router";
interface Props {
  data: ProjectData;
  projectList: ProjectDataRes[];
}

const ProjectArea = React.forwardRef<HTMLDivElement, Props>(
  ({ data, projectList }, ref) => {
    const [isReveal, setIsReveal] = React.useState<boolean>(false);
    const route = useRouter();
    if (!data.enabled) return null;
    React.useEffect(() => {
      const handleScroll = () => {
        if (
          typeof ref !== "function" &&
          ref?.current?.offsetTop &&
          window.scrollY > ref?.current?.offsetTop - 400
        )
          setIsReveal(true);
        else setIsReveal(false);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    const isMobile = useMobile();
    return (
      <div
        css={{ backgroundColor: `${data.backgroundColor}` }}
        className={styles.projectWrapper}
        ref={ref}
      >
        <span className={styles.header}>{data.title}</span>
        <div className="gap-28 flex flex-col w-full mt-20">
          {projectList
            .sort((a, b) => a.id - b.id)
            .map((project, i) => (
              <div
                key={project.attributes.ProjectId}
                css={{
                  flexDirection: `${
                    isMobile
                      ? "column-reverse"
                      : i % 2 == 0
                      ? "row"
                      : "row-reverse"
                  }`,
                  transitionDelay: `${i / 2}s`,
                  alignItems: `${isMobile ? "center" : ""}`,
                }}
                className={ClassNames([
                  styles.projectItemWrapper,
                  { [styles.projectItemWrapper_active]: isReveal },
                ])}
              >
                <div
                  css={{
                    alignItems: `${
                      isMobile ? "center" : i % 2 == 0 ? "start" : "end"
                    }`,
                  }}
                  className={styles.projectItemWrapper_text}
                >
                  <span className={styles.projectItemWrapper_text_title}>
                    {project.attributes.ProjectTitle}
                  </span>
                  <span
                    css={{
                      textAlign: `${
                        isMobile ? "center" : i % 2 == 0 ? "left" : "right"
                      }`,
                      height: "100%",
                    }}
                  >
                    {project.attributes.story}
                  </span>
                  <Button
                    variant="text"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: "black" }}
                    onClick={() => {
                      route.replace(`/project/${project.id}`);
                    }}
                  >
                    View Detail
                  </Button>
                </div>
                <div className={styles.projectItemWrapper_image}>
                  <img
                    src={project.attributes.previewImage.data.attributes.url}
                    alt={project.attributes.previewImage.data.attributes.name}
                    className={styles.projectItemWrapper_image_content}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
);

ProjectArea.displayName = "ProjectArea";

export default ProjectArea;
