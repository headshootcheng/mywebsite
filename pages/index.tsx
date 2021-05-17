import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ClassName from "classnames";
import styles from "./main.module.scss";
import * as ScreenUtil from "../utils/screenUtil";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { GetStaticProps } from "next";
import { homedata } from "../utils/globalInterface";

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
      <div className={ClassName(styles.wrapper)}>
        <div className={ClassName(styles.img)}>
          <Image
            src={homeData?.icon || ""}
            alt="Picture of the author"
            width={ScreenUtil.isMobile() ? 250 : 400}
            height={ScreenUtil.isMobile() ? 300 : 500}
          />
        </div>
        <div className={ClassName(styles.textbox)}>
          <span className={ClassName(styles.introText)}>
            {homeData?.intro || ""}
          </span>
          <div className={ClassName(styles.iconRow)}>
            <IconButton style={{ outline: "none" }} onClick={goToLinkedin}>
              <LinkedInIcon style={{ fontSize: 50, color: "white" }} />
            </IconButton>
            <IconButton style={{ outline: "none" }} onClick={goToGitHub}>
              <GitHubIcon style={{ fontSize: 50, color: "white" }} />
            </IconButton>
            <IconButton style={{ outline: "none" }} onClick={goToGitbook}>
              <LibraryBooksIcon style={{ fontSize: 50, color: "white" }} />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  try {
    const { homeData } = await await import("../data/home.js");
    return {
      props: { homeData, error: "hi" },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
};

export default Home;
