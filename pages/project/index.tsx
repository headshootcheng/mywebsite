import React, { useState } from "react";
import Head from "next/head";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import styles from "./project.module.scss";
import { GetStaticProps } from "next";
import { projectdata } from "../../utils/globalInterface";
import { useRouter } from "next/router";

interface Props {
  projectList: projectdata[];
  error: string;
}
const Project = (props: Props) => {
  const [projectList, setProjectList] = useState<projectdata[]>(
    props?.projectList || []
  );
  const router = useRouter();
  const handleProjectClick = (id) => {
    router.push("/project/" + id);
  };
  return (
    <>
      <Head>
        <title>My Project</title>
      </Head>
      <div className={styles.wrapper}>
        <ImageGallery
          projectList={projectList || []}
          onClickSlide={handleProjectClick}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { projectList } = await import("../../data/project");
    return {
      props: { projectList },
    };
  } catch (err) {
    return {
      props: { error: err.message },
    };
  }
};

export default Project;
