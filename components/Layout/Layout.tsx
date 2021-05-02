import React from "react";
import Header from "../Header/Header";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <Header menuOptionList={props.menuOptionList} />
      <div className={classes.wrapper}>{props.children}</div>
    </>
  );
};

export default Layout;
