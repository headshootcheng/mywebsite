import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

// Hooks
import useMobile from "../hooks/useMobile";

// Types
import { ContentType } from "../types/enums/ContentType";

// Components - Dynamic imports for better performance
const WelcomeArea = dynamic(() => import("../components/HomePage/WelcomeArea"), {
  ssr: true,
});
const ProfileArea = dynamic(() => import("../components/HomePage/ProfileArea"), {
  ssr: true,
});
const CareerArea = dynamic(() => import("../components/HomePage/CareerArea"), {
  ssr: true,
});
const ProjectArea = dynamic(() => import("../components/HomePage/ProjectArea"), {
  ssr: true,
});
const SkillArea = dynamic(() => import("../components/HomePage/SkillArea"), {
  ssr: true,
});
const ContactArea = dynamic(() => import("../components/HomePage/ContactArea"), {
  ssr: true,
});
const MobileNavBar = dynamic(() => import("../components/MobileNavBar"), {
  ssr: false,
});
const NavBar = dynamic(() => import("../components/NavBar"), {
  ssr: false,
});

// API
import { getHomePageData } from "./api/home";

// Utils
import { smoothScrollTo, throttle, debounce } from "../utils/helpers";
import { SCROLL_BEHAVIOR } from "../utils/constants";

export const getStaticProps: GetStaticProps<{
  pageRes: HomeRes;
}> = async () => {
  try {
    const page: HomeRes = await getHomePageData();
    return {
      props: {
        pageRes: page,
      },
      revalidate: 60 * 24 * 60, // 24 hours
    };
  } catch (err) {
    console.error("get static props err", err);
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
] as const;

const Home = ({ pageRes }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: page, error } = useSWR<HomeRes>("/api/home", {
    fallbackData: pageRes,
  });

  // Refs for sections
  const welcomeRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // State
  const [currentPage, setCurrentPage] = useState<string>("Welcome");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [mobileNavHeight, setHeight] = useState<number>(0);

  const isMobile = useMobile();

  // Memoized section refs mapping
  const sectionRefs = useMemo(() => ({
    [ContentType.Welcome]: welcomeRef,
    [ContentType.Profile]: profileRef,
    [ContentType.Career]: careerRef,
    [ContentType.Skill]: skillRef,
    [ContentType.Project]: projectRef,
    [ContentType.Contact]: contactRef,
  }), []);

  // Render content area with improved structure
  const renderContentArea = useCallback((contentType: ContentType) => {
    if (!page) return null;

    const componentMap = {
      [ContentType.Welcome]: () => <WelcomeArea data={page[contentType]} ref={sectionRefs[contentType]} />,
      [ContentType.Profile]: () => <ProfileArea data={page[contentType]} ref={sectionRefs[contentType]} />,
      [ContentType.Career]: () => <CareerArea data={page[contentType]} ref={sectionRefs[contentType]} />,
      [ContentType.Skill]: () => <SkillArea data={page[contentType]} ref={sectionRefs[contentType]} />,
      [ContentType.Project]: () => <ProjectArea data={page[contentType]} ref={sectionRefs[contentType]} />,
      [ContentType.Contact]: () => <ContactArea data={page[contentType]} ref={sectionRefs[contentType]} />,
    };

    return {
      content: componentMap[contentType]?.(),
      ref: sectionRefs[contentType],
    };
  }, [page, sectionRefs]);

  // Memoized navigation list
  const navList = useMemo(() => {
    if (!page) return [];
    
    return contentList.map((contentType: ContentType) => ({
      title: page?.[contentType]?.sectionName ?? "Section",
      position: sectionRefs[contentType]?.current?.offsetTop ?? 0,
      onTrigger: (init = false) => {
        const element = sectionRefs[contentType]?.current;
        if (element) {
          smoothScrollTo(element, init ? "auto" : "smooth");
        }
      },
    }));
  }, [page, sectionRefs]);

  // Optimized position update function
  const updatePosition = useCallback(() => {
    const scrollY = window.scrollY;
    const refs = [welcomeRef, profileRef, careerRef, skillRef, projectRef, contactRef];
    
    for (let i = 0; i < refs.length; i++) {
      const currentRef = refs[i]?.current;
      const nextRef = refs[i + 1]?.current;
      
      if (currentRef) {
        const currentTop = currentRef.offsetTop;
        const nextTop = nextRef?.offsetTop ?? Infinity;
        
        if (scrollY >= currentTop && scrollY < nextTop) {
          setCurrentPage(navList[i]?.title || "");
          break;
        }
      }
    }
  }, [navList]);

  // Optimized menu visibility handler
  const handleMenuVisibility = useCallback(() => {
    const scrollY = window.scrollY;
    
    // Desktop menu visibility
    setShowMenu(scrollY > SCROLL_BEHAVIOR.OFFSET);
    
    // Mobile menu height calculation
    const profileTop = profileRef?.current?.offsetTop || 0;
    const heightRatio = (scrollY - profileTop) / 300;
    
    if (heightRatio > 1) setHeight(SCROLL_BEHAVIOR.MOBILE_MENU_HEIGHT_RATIO);
    else if (heightRatio < 0) setHeight(0);
    else setHeight(SCROLL_BEHAVIOR.MOBILE_MENU_HEIGHT_RATIO * heightRatio);
  }, []);

  // Throttled scroll handler for better performance
  const scrollHandler = useMemo(
    () => throttle(() => {
      updatePosition();
      handleMenuVisibility();
    }, 16), // ~60fps
    [updatePosition, handleMenuVisibility]
  );

  // Debounced menu hide function
  const hideMenuDelayed = useMemo(
    () => debounce(() => setShowMenu(false), SCROLL_BEHAVIOR.MENU_HIDE_DELAY),
    []
  );

  // Hash change handler
  const hashHandler = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    const targetNav = navList.find((nav) => nav.title === hash);
    targetNav?.onTrigger();
  }, [navList]);

  // Enhanced scroll handler with menu hiding
  const enhancedScrollHandler = useCallback(() => {
    scrollHandler();
    hideMenuDelayed();
  }, [scrollHandler, hideMenuDelayed]);

  useEffect(() => {
    // Initial hash handling
    if (typeof window !== 'undefined') {
      hashHandler();
    }

    if (page) {
      window.addEventListener("scroll", enhancedScrollHandler, { passive: true });
      window.addEventListener("hashchange", hashHandler);
    }

    return () => {
      window.removeEventListener("scroll", enhancedScrollHandler);
      window.removeEventListener("hashchange", hashHandler);
    };
  }, [page, enhancedScrollHandler, hashHandler]);

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href={page.icon} />
        <meta name="description" content={`${page.title} - Professional Portfolio`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="aAsoBFo0oI0JbkRF5wcEqVfGlTobRQ_H_EvkH7LU_7A" />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={`${page.title} - Professional Portfolio`} />
        <meta property="og:type" content="website" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      
      <div className="overflow-auto">
        <nav role="navigation" aria-label="Main navigation">
          {isMobile ? (
            <MobileNavBar
              navList={navList}
              currentPage={currentPage}
              height={mobileNavHeight}
            />
          ) : (
            showMenu && <NavBar navList={navList} currentPage={currentPage} />
          )}
        </nav>
        
        <main>
          {contentList.map((contentType: ContentType) => (
            <section key={contentType} id={contentType}>
              {renderContentArea(contentType)?.content ?? null}
            </section>
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
