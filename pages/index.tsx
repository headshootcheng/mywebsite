import React from "react";
import Head from "next/head";
import styles from "./main.module.css";
import Loading from "../components/Loading";
import useSWR from "swr";
import { ContentType } from "../types/enums/ContentType";
import ProfileArea from "../components/HomePage/ProfileArea";
import WelcomeArea from "../components/HomePage/WelcomeArea";
import { Content, HomeRes } from "../types/HomeContent";
interface Props {}
const Home: React.FC<Props> = (props) => {
  const { data: page } = useSWR<HomeRes>(
    "/home-page?populate[3]=Content.infos&populate[2]=Content.profileImage&populate[1]=Content.backgroundImage.image&populate[0]=Content"
  );
  const welcomeRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const renderContentArea = (content: Content) => {
    switch (content.__component) {
      case ContentType.Welcome:
        return <WelcomeArea data={content} ref={welcomeRef} />;
      case ContentType.Profile:
        return <ProfileArea data={content} ref={profileRef} />;
      default:
        return null;
    }
  };

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
          <div>
            {(page?.data.attributes.Content ?? []).map((content: Content) =>
              renderContentArea(content)
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
