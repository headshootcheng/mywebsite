import React from "react";
import Head from "next/head";
import Image from "next/image";

import ClassName from "classnames";
import styles from "./main.module.scss";
import * as ScreenUtil from "../utils/screenUtil";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
const Home = () => {
  const goToLinkedin = () => {
    window.open("https://www.linkedin.com/in/peter-cheng-56146814a/");
  };

  const goToGitHub = () => {
    window.open("https://github.com/headshootcheng");
  };

  const goToGitbook = () => {
    window.open("https://petercheng7788.gitbook.io/developer-note/");
  };
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={ClassName(styles.wrapper)}>
        <div className={ClassName(styles.img)}>
          <Image
            src="/profile/personalphoto.jpg"
            alt="Picture of the author"
            width={ScreenUtil.isMobile() ? 250 : 400}
            height={ScreenUtil.isMobile() ? 300 : 500}
          />
        </div>
        <div className={ClassName(styles.textbox)}>
          <span className={ClassName(styles.introText)}>
            Hi! I am Peter Cheng! I graduate in the Chinese University of Hong
            Kong and currently act as a software developer. I love to explore
            new thing and accept different challenges. In my short term of goal,
            I would like to grow up, develop different projects by using new
            technology, but also communicate more with other developers so as to
            understand my weakness and improve my coding skill and communication
            skill. Ultimatly, I would like to make some contribution to the
            society with help of technology and organize my own startup company
            !!!
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

export default Home;
