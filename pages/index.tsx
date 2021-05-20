import React, { useRef, useState, useMemo, useEffect } from "react";
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
  const welcomeRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  // const [homeData, setHomeData] = useState<homedata>(props?.homeData || {});
  // const goToLinkedin = () => {
  //   if (homeData?.linkedin) window.open(homeData.linkedin);
  // };

  // const goToGitHub = () => {
  //   if (homeData?.github) window.open(homeData.github);
  // };

  // const goToGitbook = () => {
  //   if (homeData?.gitbook) window.open(homeData.gitbook);
  // };

  const navList = useMemo(
    () => [
      {
        title: "Welcome",
        onPress: () => {
          window.scrollTo(0, welcomeRef.current.offsetTop);
        },
      },
      {
        title: "Profile",
        onPress: () => {
          window.scrollTo(0, profileRef.current.offsetTop);
        },
      },
      {
        title: "Experience",
        onPress: () => {
          window.scrollTo(0, experienceRef.current.offsetTop);
        },
      },
      {
        title: "Skill",
        onPress: () => {
          window.scrollTo(0, skillRef.current.offsetTop);
        },
      },
      {
        title: "Project",
        onPress: () => {
          window.scrollTo(0, projectRef.current.offsetTop);
        },
      },
      {
        title: "Contact",
        onPress: () => {
          window.scrollTo(0, contactRef.current.offsetTop);
        },
      },
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(navList[0].title || "Welcome");

  const updatePostion = () => {
    if (
      window.pageYOffset >= welcomeRef.current.offsetTop &&
      window.pageYOffset < profileRef.current.offsetTop
    ) {
      setCurrentPage(navList[0].title);
      return;
    }
    if (
      window.pageYOffset >= profileRef.current.offsetTop &&
      window.pageYOffset < experienceRef.current.offsetTop
    ) {
      setCurrentPage(navList[1].title);
      return;
    }
    if (
      window.pageYOffset >= experienceRef.current.offsetTop &&
      window.pageYOffset < skillRef.current.offsetTop
    ) {
      setCurrentPage(navList[2].title);
      return;
    }
    if (
      window.pageYOffset >= skillRef.current.offsetTop &&
      window.pageYOffset < projectRef.current.offsetTop
    ) {
      setCurrentPage(navList[3].title);
      return;
    }
    if (
      window.pageYOffset >= projectRef.current.offsetTop &&
      window.pageYOffset < contactRef.current.offsetTop
    ) {
      setCurrentPage(navList[4].title);
      return;
    }
    if (window.pageYOffset >= contactRef.current.offsetTop) {
      setCurrentPage(navList[5].title);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", updatePostion);
    return () => {
      window.removeEventListener("scroll", updatePostion);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.wrapper}>
        {isMobile() ? (
          <MobileNavBar navList={navList} currentPage={currentPage} />
        ) : (
          <NavBar navList={navList} currentPage={currentPage} />
        )}
        <Welcome ref={welcomeRef} />
        <Profile ref={profileRef} />
        <Experience ref={experienceRef} />
        <Skill ref={skillRef} />
        <Project ref={projectRef} />
        <Contact ref={contactRef} />
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
