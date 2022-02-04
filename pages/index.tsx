import React from "react";
import Head from "next/head";
import styles from "./main.module.css";
import Loading from "../components/Loading";
import useSWR from "swr";
import { ContentType } from "../types/enums/ContentType";
import ProfileArea from "../components/HomePage/ProfileArea";
import WelcomeArea from "../components/HomePage/WelcomeArea";
import { Content, HomeRes } from "../types/HomeContent";
import CareerArea from "../components/HomePage/CareerArea";
import NavBar from "../components/NavBar/NavBar";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import useMobile from "../hooks/useMobile";
interface Props {}
const Home: React.FC<Props> = (props) => {
  const { data: page } = useSWR<HomeRes>(
    "/home-page?populate[3]=Content.infos&populate[2]=Content.profileImage&populate[1]=Content.backgroundImage.image&populate[0]=Content"
  );
  const welcomeRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const careerRef = React.useRef<HTMLDivElement>(null);
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
      default:
        return null;
    }
  };

  const navList = (page?.data.attributes.Content ?? [])
    .filter((content) => content.enabled)
    .map((content) => ({
      title: content.title,
      position: renderContentArea(content)?.ref?.current?.offsetTop ?? 0,
      onPress: () => {
        window.scrollTo({
          top: renderContentArea(content)?.ref?.current?.offsetTop ?? 0,
          behavior: "smooth",
        });
      },
    }));

  const [currentPage, setCurrentPage] = React.useState<string>(
    navList?.[0]?.title || "Welcome"
  );
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [mobileNavHeight, setHeight] = React.useState<number>(0);
  const updatePosition = () => {
    if (
      window.pageYOffset >= (welcomeRef?.current?.offsetTop || 0) &&
      window.pageYOffset < (profileRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList?.[0]?.title ?? "");
      return;
    }
    if (
      window.pageYOffset >= (profileRef?.current?.offsetTop || 0) &&
      window.pageYOffset < (careerRef?.current?.offsetTop || 0)
    ) {
      setCurrentPage(navList?.[1]?.title ?? "");
      return;
    }
    if (window.pageYOffset >= (careerRef?.current?.offsetTop || 0)) {
      setCurrentPage(navList?.[2]?.title ?? "");
      return;
    }
    // if (
    //   window.pageYOffset >= (skillRef?.current?.offsetTop || 0) &&
    //   window.pageYOffset < (projectRef?.current?.offsetTop || 0)
    // ) {
    //   setCurrentPage(navList[3].title);
    //   return;
    // }
    // if (
    //   window.pageYOffset >= (projectRef?.current?.offsetTop || 0) &&
    //   window.pageYOffset < (contactRef?.current?.offsetTop || 0)
    // ) {
    //   setCurrentPage(navList[4].title);
    //   return;
    // }
    // if (window.pageYOffset >= (contactRef?.current?.offsetTop || 0)) {
    //   setCurrentPage(navList[5].title);
    //   return;
    // }
  };

  // const updatePosition = () => {
  //   navList.forEach((nav, i) => {
  //     if (
  //       !!navList[i + 1] &&
  //       window.scrollY >= nav.position &&
  //       window.screenY < navList[i + 1].position
  //     )
  //       setCurrentPage(navList[i].title);
  //     else if (window.scrollY >= nav.position) setCurrentPage(navList[i].title);
  //   });
  // };

  let isScrolling: NodeJS.Timeout;
  const handleMenuOpen = () => {
    // Manipulate the appearance of desktop menu
    if (window.pageYOffset > 100) setShowMenu(true);
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
  React.useEffect(() => {
    if (page) window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [page]);

  return (
    <>
      <Head>
        <title>{page?.data.attributes.WebTitle}</title>
        <meta
          name="google-site-verification"
          content="aAsoBFo0oI0JbkRF5wcEqVfGlTobRQ_H_EvkH7LU_7A"
        />
      </Head>
      <div className={styles.wrapper}>
        {!page ? (
          <Loading />
        ) : (
          <>
            {isMobile ? (
              <MobileNavBar
                navList={navList}
                currentPage={currentPage}
                height={mobileNavHeight}
              />
            ) : (
              showMenu && <NavBar navList={navList} currentPage={currentPage} />
            )}
            {(page?.data.attributes.Content ?? []).map(
              (content: Content) => renderContentArea(content)?.content ?? null
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
