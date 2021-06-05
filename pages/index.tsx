import React, { useRef, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import styles from "./main.module.scss";
import { GetStaticProps } from "next";
import homedata from "../model/HomeData";
import Welcome from "../components/Welcome/Welcome";
import Profile from "../components/Profile/Profile";
import Career from "../components/Career/Career";
import Skill from "../components/Skill/Skill";
import Project from "../components/Project/Project";
import Contact from "../components/Contact/Contact";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import { isMobile } from "../utils/ScreenUtil";
import NavBar from "../components/NavBar/NavBar";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import NoteIcon from "@material-ui/icons/Note";
interface Props {
  homeData: homedata;
  error: string;
}
const Home: React.FC<Props> = (props) => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [homeData, setHomeData] = useState<homedata>(props?.homeData);

  const contactList = [
    {
      type: "linkedin",
      icon: (
        <LinkedInIcon
          fontSize="large"
          style={{
						height: isMobile() ? 40 : 50,
						width: isMobile() ? 40 : 50,
						margin: 0,
						color: "white",
					}}
        />
      ),
      link: homeData?.linkedin || "",
      onPress: () => {
        if (homeData?.linkedin) window.open(homeData.linkedin);
      },
    },
    {
      type: "github",
      icon: (
        <GitHubIcon
          fontSize="large"
          style={{
						height: isMobile() ? 40 : 50,
						width: isMobile() ? 40 : 50,
						margin: 0,
						color: "white",
					}}
        />
      ),
      link: homeData?.github || "",
      onPress: () => {
        if (homeData?.github) window.open(homeData.github);
      },
    },
    {
      type: "gitbook",
      icon: (
        <NoteIcon
          fontSize="large"
          style={{
						height: isMobile() ? 40 : 50,
						width: isMobile() ? 40 : 50,
						margin: 0,
						color: "white",
					}}
        />
      ),
      link: homeData?.gitbook || "",
      onPress: () => {
        if (homeData?.linkedin) window.open(homeData.gitbook);
      },
    },
  ];

  const navList = useMemo(
    () => [
      {
        title: "Welcome",
        onPress: () => {
          window.scrollTo({
            top: welcomeRef?.current?.offsetTop || 0,
            behavior: "smooth",
          });
        },
      },
      {
        title: "Profile",
        onPress: () => {
          window.scrollTo({
            top: profileRef?.current?.offsetTop || 0,
            behavior: "smooth",
          });
        },
      },
      {
        title: "Career",
        onPress: () => {
          window.scrollTo({
            top: careerRef?.current?.offsetTop || 0,
            behavior: "smooth",
          });
        },
      },
      {
        title: "Skill",
        onPress: () => {
          window.scrollTo({
            top: skillRef?.current?.offsetTop || 0,
            behavior: "smooth",
          });
        },
      },
      {
        title: "Project",
        onPress: () => {
          window.scrollTo({
            top: projectRef?.current?.offsetTop || 0,
            behavior: "smooth",
          });
        },
      },
      {
        title: "Contact",
        onPress: () => {
          window.scrollTo({
            top: contactRef?.current?.offsetTop || 0,
            behavior: "smooth",
          });
        },
      },
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState<string>(
    navList[0].title || "Welcome"
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [mobileNavHeight, setHeight] = useState<number>(0);
  const updatePosition = () => {
    if (
      window.pageYOffset >= (welcomeRef?.current?.offsetTop || 0) &&
      window.pageYOffset < (profileRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[0].title);
      return;
    }
    if (
      window.pageYOffset >= (profileRef?.current?.offsetTop || 0) &&
      window.pageYOffset < (careerRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[1].title);
      return;
    }
    if (
      window.pageYOffset >= (careerRef?.current?.offsetTop || 0) &&
      window.pageYOffset < (skillRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[2].title);
      return;
    }
    if (
      window.pageYOffset >= (skillRef?.current?.offsetTop || 0) &&
      window.pageYOffset < (projectRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[3].title);
      return;
    }
    if (
      window.pageYOffset >= (projectRef?.current?.offsetTop || 0) &&
      window.pageYOffset < (contactRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[4].title);
      return;
    }
    if (window.pageYOffset >= (contactRef?.current?.offsetTop || 0)) {
      setCurrentPage(navList[5].title);
      return;
    }
  };

  let isScrolling: NodeJS.Timeout;
  const handleMenuOpen = () => {
    // Manipulate the appearance of desktop menu
    if (window.pageYOffset > (profileRef?.current?.offsetTop || 0))
      setShowMenu(true);
    else setShowMenu(false);

    // Manipulate the height of mobile menu
    const heightRatio =
      (window.pageYOffset - (profileRef?.current?.offsetTop || 0)) / 300;
    if (heightRatio > 1) setHeight(80);
    else if (heightRatio < 0) setHeight(0);
    else setHeight(80 * heightRatio);
  };
  const scrollHandler = () => {
    window.clearTimeout(isScrolling);
    updatePosition();
    handleMenuOpen();
    // If user stop scrolling over 1 seconds, hide the desktop menu
    isScrolling = setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Peter Cheng - My Personal Profilio</title>
      </Head>
      <div className={styles.wrapper}>
        {isMobile() ? (
          <MobileNavBar
            navList={navList}
            currentPage={currentPage}
            height={mobileNavHeight}
          />
        ) : (
          showMenu && <NavBar navList={navList} currentPage={currentPage} />
        )}
        <Welcome ref={welcomeRef} />
        <Profile
          image={homeData?.icon || ""}
          introText={homeData?.intro || ""}
          ref={profileRef}
        />
        <Career ref={careerRef} careerList={homeData?.career || []} />
        <Skill ref={skillRef} skillList={homeData?.skill || []} />
        <Project ref={projectRef} projectList={homeData?.project || []} />
        <Contact ref={contactRef} contactList={contactList} />
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps<
  { homeData: homedata } | { error: string }
> = async () => {
  try {
    const { homeData } = await import("../data/home.js");
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
