import React from "react";
import Head from "next/head";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import styles from "./project.module.scss";
import { GetStaticProps } from "next";
import { projectdata } from "../../utils/globalInterface";
interface Props {
  projectList: projectdata[];
  error: string;
}
const Project = ({ projectList, error }: Props) => {
  return (
    <>
      <Head>
        <title>My Project</title>
      </Head>
      <div className={styles.wrapper}>
        <ImageGallery projectList={projectList || []} />
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
