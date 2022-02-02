import { SWRConfig } from "swr";
import axios from "axios";
import "../styles/global.css";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.min.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import SEO from "../next-seo.config";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const fetcher = (url: string) =>
    axios
      .get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`)
      .then((res) => res.data);
  return (
    <>
      <DefaultSeo {...SEO} />
      <SWRConfig
        value={{ revalidateOnFocus: false, refreshInterval: 0, fetcher }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
};

export default App;
