import React from "react";
import Head from "next/head";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import styles from "./project.module.scss";
const Project = () => {
  const projectList = [
    {
      id: "superwhackamole",
      image: "/superwhackamole/game.jpg",
      title: "Super Whack A Mole",
    },
    {
      id: "iefyp",
      image: "/iefyp/app.jpg",
      title: "Final Year Project",
    },
    {
      id: "friendchat",
      image: "/friendchat/dashboard.jpg",
      title: "Friend Chat",
    },
  ];
  return (
    <>
      <Head>
        <title>My Project</title>
      </Head>
      <div className={styles.wrapper}>
        <ImageGallery projectList={projectList} />
      </div>
    </>
  );
};

export default Project;
