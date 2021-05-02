import "../styles/output.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  interface option {
    id: string;
    link: string;
    display: string;
  }
  const menuOptionList: option[] = [
    { id: "home", link: "/", display: "Home" },
    { id: "project", link: "/project", display: "Project" },
  ];
  return (
    <Layout menuOptionList={menuOptionList}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
