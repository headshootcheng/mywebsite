import React from "react";
import Head from "next/head";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import styles from "./project.module.scss";
const Project = () => {
  return (
    <>
      <Head>
        <title>My Project</title>
      </Head>
      <div className={styles.wrapper}>
        <ImageGallery />
      </div>
    </>
  );
};

export default Project;
