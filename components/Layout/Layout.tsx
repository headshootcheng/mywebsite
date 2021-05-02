import React from "react";
import Header from "../Header/Header";
import classes from "./Layout.module.css";
interface option {
  id: string;
  link: string;
  display: string;
}
interface Props {
  menuOptionList: option[];
  children?: React.ReactNode;
}
const Layout = (props: Props) => {
  return (
    <>
      <Header menuOptionList={props.menuOptionList} />
      <div className={classes.wrapper}>{props.children}</div>
    </>
  );
};

export default Layout;
