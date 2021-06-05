import "../styles/output.css";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.min.css";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
