import React from "react";
import Head from "next/head";
import styles from "./main.module.css";
import Loading from "../components/Loading";
import useSWR from "swr";
import { ContentType } from "../types/enums/ContentType";
import WelcomeArea from "../components/HomePage/WelcomeArea";
interface Props {}
const Home: React.FC<Props> = (props) => {
  const { data: page } = useSWR<HomeRes>(
    "/home-page?populate[0]=Content&populate[1]=Content.backgroundImage&populate[2]=Content.backgroundImage.image"
  );
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
            {(page?.data.attributes.Content ?? []).map(
              (content: Content, i) =>
                content.__component === ContentType.Welcome && (
                  <WelcomeArea key={i} data={content} />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
