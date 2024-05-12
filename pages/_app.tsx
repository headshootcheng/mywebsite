import { SWRConfig } from "swr";
import axios from "axios";
import "../styles/global.css";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.min.css";
import { DefaultSeo } from "next-seo";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import SEO from "../next-seo.config";
import { Suspense } from "react";
import Loading from "../components/Loading";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const fetcher = (url: string) => axios.get(`${url}`).then((res) => res.data);
  return (
    <>
      <DefaultSeo {...SEO} />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          refreshInterval: 0,
          suspense: true,
          fetcher,
        }}
      >
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <Component {...pageProps} />
          </Suspense>
        </RecoilRoot>
      </SWRConfig>
    </>
  );
};

export default App;
