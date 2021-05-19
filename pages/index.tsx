import React, { useState } from "react";
import Head from "next/head";
import styles from "./main.module.scss";
import { GetStaticProps } from "next";
import { homedata } from "../utils/globalInterface";
import Welcome from "../components/Welcome/Welcome";
import Profile from "../components/Profile/Profile";
import Experience from "../components/Experience/Experience";
import Skill from "../components/Skill/Skill";
import Project from "../components/Project/Project";
import Contact from "../components/Contact/Contact";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import { isMobile } from "../utils/screenUtil";
import NavBar from "../components/NavBar/NavBar";

interface Props {
  homeData: homedata;
  error: string;
}
const Home = (props: Props) => {
  const [homeData, setHomeData] = useState<homedata>(props?.homeData || {});
  const goToLinkedin = () => {
    if (homeData?.linkedin) window.open(homeData.linkedin);
  };

  const goToGitHub = () => {
    if (homeData?.github) window.open(homeData.github);
  };

  const goToGitbook = () => {
    if (homeData?.gitbook) window.open(homeData.gitbook);
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.wrapper}>
        {isMobile() ? <MobileNavBar /> : <NavBar />}
        <Welcome />
        <Profile />
        <Experience />
        <Skill />
        <Project />
        <Contact />
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  try {
    const { homeData } = await await import("../data/home.js");
    return {
      props: { homeData },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
};

export default Home;
