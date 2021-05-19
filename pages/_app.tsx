import "../styles/output.css";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.min.css";

import type { AppProps } from "next/app";
// import Layout from "../components/Layout/Layout";
import { option } from "../utils/globalInterface";

const App = ({ Component, pageProps }: AppProps) => {
  const menuOptionList: option[] = [
    { id: "home", link: "/", display: "Home" },
    { id: "project", link: "/project", display: "Project" },
  ];
  return <Component {...pageProps} />;
};

export default App;
