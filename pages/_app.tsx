import "../styles/output.css";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.min.css";
import { DefaultSeo } from "next-seo";
import { Container } from "next/app";
import type { AppProps } from "next/app";
import SEO from "../next-seo.config";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Container>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Container>
  );
};

export default App;
