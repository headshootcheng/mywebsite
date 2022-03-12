import React from "react";
import Head from "next/head";
import useSWR from "swr";
import { ContentType } from "../types/enums/ContentType";
import ProfileArea from "../components/HomePage/ProfileArea";
import WelcomeArea from "../components/HomePage/WelcomeArea";
import { Content, HomeRes } from "../types/HomeContent";
import CareerArea from "../components/HomePage/CareerArea";
import NavBar from "../components/NavBar";
import MobileNavBar from "../components/MobileNavBar";
import useMobile from "../hooks/useMobile";
import SkillArea from "../components/HomePage/SkillArea";
import ContactArea from "../components/HomePage/ContactArea";
import ProjectArea from "../components/HomePage/ProjectArea";
import axios, { AxiosResponse } from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{
  pageRes: HomeRes;
  projectListRes: ProjectListRes;
}> = async () => {
  const { data: page }: AxiosResponse<HomeRes> = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/home-page?&populate[6]=webIcon&populate[5]=Content.SkillInfos&populate[4]=Content.SkillTypes&populate[3]=Content.infos&populate[2]=Content.profileImage&populate[1]=Content.backgroundImage.image&populate[0]=Content`
  );
  try {
    const { data: projectList }: AxiosResponse<ProjectListRes> =
      await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/projects?populate[0]=previewImage&populate[1]=ProjectImages.image`
      );
    return {
      props: {
        pageRes: page,
        projectListRes: projectList,
      },
      revalidate: 60 * 24 * 60,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

const Home = ({
  pageRes,
  projectListRes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: page } = useSWR<HomeRes>(
    "/home-page?&populate[6]=webIcon&populate[5]=Content.SkillInfos&populate[4]=Content.SkillTypes&populate[3]=Content.infos&populate[2]=Content.profileImage&populate[1]=Content.backgroundImage.image&populate[0]=Content",
    {
      fallbackData: pageRes,
    }
  );
  const { data: projectList } = useSWR<ProjectListRes>(
    "/projects?populate[0]=previewImage&populate[1]=ProjectImages.image",
    {
      fallbackData: projectListRes,
    }
  );

  if (!page || !projectList) return null;
  const welcomeRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const careerRef = React.useRef<HTMLDivElement>(null);
  const skillRef = React.useRef<HTMLDivElement>(null);
  const projectRef = React.useRef<HTMLDivElement>(null);
  const contactRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const renderContentArea = (content: Content) => {
    switch (content.__component) {
      case ContentType.Welcome:
        return {
          content: <WelcomeArea data={content} ref={welcomeRef} />,
          ref: welcomeRef,
        };
      case ContentType.Profile:
        return {
          content: <ProfileArea data={content} ref={profileRef} />,
          ref: profileRef,
        };
      case ContentType.Career:
        return {
          content: <CareerArea data={content} ref={careerRef} />,
          ref: careerRef,
        };
      case ContentType.Skill:
        return {
          content: <SkillArea data={content} ref={skillRef} />,
          ref: skillRef,
        };
      case ContentType.Project:
        return {
          content: (
            <ProjectArea
              data={content}
              projectList={projectList.data ?? []}
              ref={projectRef}
            />
          ),
          ref: projectRef,
        };
      case ContentType.Contact:
        return {
          content: <ContactArea data={content} ref={contactRef} />,
          ref: contactRef,
        };
      default:
        return null;
    }
  };

  const navList = (page.data.attributes.Content ?? [])
    .filter((content) => content.enabled)
    .map((content) => ({
      title: content.title,
      position: renderContentArea(content)?.ref?.current?.offsetTop ?? 0,
      onTrigger: (init = false) => {
        window.scrollTo({
          top: renderContentArea(content)?.ref?.current?.offsetTop ?? 0,
          behavior: init ? "auto" : "smooth",
        });
      },
      onPress: () => {
        window.location.hash = content.title;
      },
    }));

  const [currentPage, setCurrentPage] = React.useState<string>(
    navList?.[0]?.title || "Welcome"
  );
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [mobileNavHeight, setHeight] = React.useState<number>(0);

  const updatePosition = () => {
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
  };

  let isScrolling: NodeJS.Timeout;
  const handleMenuOpen = () => {
    // Manipulate the appearance of desktop menu
    if (window.scrollY > 100) setShowMenu(true);
    else setShowMenu(false);

    // Manipulate the height of mobile menu
    const heightRatio =
      (window.scrollY - (profileRef?.current?.offsetTop || 0)) / 300;
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
  const hashHandler = () => {
    navList
      .find((nav) => nav.title === window.location.hash.replace("#", ""))
      ?.onTrigger();
  };

  React.useEffect(() => {
    navList
      .find((nav) => nav.title === window.location.hash.replace("#", ""))
      ?.onTrigger(true);
    if (page && projectList) {
      window.addEventListener("scroll", scrollHandler);
      window.addEventListener("hashchange", hashHandler);
    }
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("hashchange", hashHandler);
    };
  }, [page, projectList]);

  return (
    <>
      <Head>
        <title>{page.data.attributes.WebTitle ?? "Loading..."}</title>
        <link
          rel="icon"
          href={page.data.attributes.webIcon.data.attributes.url}
        ></link>
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
        {(page.data.attributes.Content ?? []).map((content: Content) => (
          <div key={content.title}>
            {renderContentArea(content)?.content ?? null}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
