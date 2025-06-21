/** @jsxImportSource @emotion/react */
import React from "react";
import ClassNames from "classnames";
import styles from "./Project.module.css";
import { useIsMobile } from "../../../hooks/useMediaQuery";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

interface Props {
  data: ProjectData;
}

const ProjectArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [observerRef, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "0px",
  });
  console.log("ProjectArea isVisible", isVisible, observerRef);

  const isMobile = useIsMobile();

  // Combine refs - must be called before any early returns
  React.useImperativeHandle(ref, () => observerRef.current as HTMLDivElement);

  if (!data.isEnabled) return null;
  return (
    <section
      className={styles.projectWrapper}
      ref={observerRef}
      aria-labelledby="projects-header"
    >
      <h2 id="projects-header" className={styles.header}>
        {data.sectionName}
      </h2>
      <div className="gap-28 flex flex-col w-full mt-20">
        {data.items
          .sort((a, b) => a.id - b.id)
          .map((project, i) => (
            <article
              key={project.id}
              css={{
                flexDirection: `${
                  isMobile
                    ? "column-reverse"
                    : i % 2 === 0
                    ? "row"
                    : "row-reverse"
                }`,
                transitionDelay: `${i / 2}s`,
                alignItems: `${isMobile ? "center" : ""}`,
              }}
              className={ClassNames([
                styles.projectItemWrapper,
                { [styles.projectItemWrapper_active]: isVisible },
              ])}
              role="article"
              aria-labelledby={`project-title-${project.id}`}
            >
              <div
                css={{
                  alignItems: `${
                    isMobile ? "center" : i % 2 === 0 ? "start" : "end"
                  }`,
                }}
                className={styles.projectItemWrapper_text}
              >
                <h3
                  id={`project-title-${project.id}`}
                  className={styles.projectItemWrapper_text_title}
                >
                  {project.title}
                </h3>
                <p
                  css={{
                    textAlign: `${
                      isMobile ? "center" : i % 2 === 0 ? "left" : "right"
                    }`,
                    height: "100%",
                  }}
                >
                  {project.description}
                </p>
              </div>
              <div className={styles.projectItemWrapper_image}>
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title} project`}
                  className={styles.projectItemWrapper_image_content}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
      </div>
    </section>
  );
});

ProjectArea.displayName = "ProjectArea";

export default ProjectArea;
