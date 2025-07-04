import React from "react";
import useSWR from "swr";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import useMobile from "../hooks/useMobile";
import { ContentType } from "../types/enums/ContentType";
import WelcomeArea from "../components/HomePage/WelcomeArea";
import ProfileArea from "../components/HomePage/ProfileArea";
import CareerArea from "../components/HomePage/CareerArea";
import ProjectArea from "../components/HomePage/ProjectArea";
import SkillArea from "../components/HomePage/SkillArea";
import ContactArea from "../components/HomePage/ContactArea";
import MobileNavBar from "../components/MobileNavBar";
import NavBar from "../components/NavBar";
import Head from "next/head";
import { getHomePageData } from "./api/home";

export const getStaticProps: GetStaticProps<{
  pageRes: HomeRes;
}> = async () => {
  try {
    const page: HomeRes = await getHomePageData();
    return {
      props: {
        pageRes: page,
      },
      revalidate: 60 * 24 * 60,
    };
  } catch (err) {
    console.log("get static props err", err);
    return {
      notFound: true,
    };
  }
};

const contentList = [
  ContentType.Welcome,
  ContentType.Profile,
  ContentType.Career,
  ContentType.Skill,
  ContentType.Project,
  ContentType.Contact,
];

const Home = ({ pageRes }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: page } = useSWR<HomeRes>("/api/home", {
    fallbackData: pageRes,
  });
  console.log("page data", page);

  const welcomeRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const careerRef = React.useRef<HTMLDivElement>(null);
  const skillRef = React.useRef<HTMLDivElement>(null);
  const projectRef = React.useRef<HTMLDivElement>(null);
  const contactRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const isScrolling = React.useRef<NodeJS.Timeout>();

  const [currentPage, setCurrentPage] = React.useState<string>("Welcome");
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [mobileNavHeight, setHeight] = React.useState<number>(0);

  const renderContentArea = React.useCallback(
    (contentType: ContentType) => {
      if (!page) return null;
      switch (contentType) {
        case ContentType.Welcome:
          return {
            content: <WelcomeArea data={page[contentType]} ref={welcomeRef} />,
            ref: welcomeRef,
          };
        case ContentType.Profile:
          return {
            content: <ProfileArea data={page[contentType]} ref={profileRef} />,
            ref: profileRef,
          };
        case ContentType.Career:
          return {
            content: <CareerArea data={page[contentType]} ref={careerRef} />,
            ref: careerRef,
          };
        case ContentType.Skill:
          return {
            content: <SkillArea data={page[contentType]} ref={skillRef} />,
            ref: skillRef,
          };
        case ContentType.Project:
          return {
            content: <ProjectArea data={page[contentType]} ref={projectRef} />,
            ref: projectRef,
          };
        case ContentType.Contact:
          return {
            content: <ContactArea data={page[contentType]} ref={contactRef} />,
            ref: contactRef,
          };
        default:
          return null;
      }
    },
    [page]
  );

  const navList: Nav[] = React.useMemo(
    () =>
      contentList.map((contentType: ContentType) => ({
        title: page?.[contentType]?.sectionName ?? "Section",
        position: renderContentArea(contentType)?.ref?.current?.offsetTop ?? 0,
        onTrigger: (init = false) => {
          window.scrollTo({
            top: renderContentArea(contentType)?.ref?.current?.offsetTop ?? 0,
            behavior: init ? "auto" : "smooth",
          });
        },
      })),
    [page, renderContentArea]
  );

  const updatePosition = React.useCallback(() => {
    if (
      window.scrollY >= (welcomeRef?.current?.offsetTop || 0) &&
      window.scrollY < (profileRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[0].title);
      return;
    }
    if (
      window.scrollY >= (profileRef?.current?.offsetTop || 0) &&
      window.scrollY < (careerRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[1].title);
      return;
    }
    if (
      window.scrollY >= (careerRef?.current?.offsetTop || 0) &&
      window.scrollY < (skillRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[2].title);
      return;
    }
    if (
      window.scrollY >= (skillRef?.current?.offsetTop || 0) &&
      window.scrollY < (projectRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[3].title);
      return;
    }
    if (
      window.scrollY >= (projectRef?.current?.offsetTop || 0) &&
      window.scrollY < (contactRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList[4].title);
      return;
    }
    if (window.scrollY >= (contactRef?.current?.offsetTop || 0)) {
      setCurrentPage(navList[5].title);
      return;
    }
  }, [navList]);

  const handleMenuOpen = React.useCallback(() => {
    if (window.scrollY > 100) setShowMenu(true);
    else setShowMenu(false);

    const heightRatio =
      (window.scrollY - (profileRef?.current?.offsetTop || 0)) / 300;
    if (heightRatio > 1) setHeight(80);
    else if (heightRatio < 0) setHeight(0);
    else setHeight(80 * heightRatio);
  }, []);

  const scrollHandler = React.useCallback(() => {
    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current);
    }
    updatePosition();
    handleMenuOpen();
    isScrolling.current = setTimeout(() => {
      setShowMenu(false);
    }, 2000);
  }, [handleMenuOpen, updatePosition]);

  const hashHandler = React.useCallback(() => {
    navList
      .find((nav) => nav.title === window.location.hash.replace("#", ""))
      ?.onTrigger();
  }, [navList]);

  React.useEffect(() => {
    if (page) {
      hashHandler();
      window.addEventListener("scroll", scrollHandler);
      window.addEventListener("hashchange", hashHandler);
    }
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("hashchange", hashHandler);
    };
  }, [page, hashHandler, scrollHandler]);

  if (!page) return null;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href={page.icon}></link>
        <meta
          name="google-site-verification"
          content="aAsoBFo0oI0JbkRF5wcEqVfGlTobRQ_H_EvkH7LU_7A"
        />
      </Head>
      <div className="overflow-auto">
        {isMobile ? (
          <MobileNavBar
            navList={navList}
            currentPage={currentPage}
            height={mobileNavHeight}
          />
        ) : (
          showMenu && <NavBar navList={navList} currentPage={currentPage} />
        )}
        {contentList.map((contentType: ContentType) => (
          <div key={contentType}>
            {renderContentArea(contentType)?.content ?? null}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
