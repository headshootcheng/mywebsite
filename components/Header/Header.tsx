import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import classes from "./Header.module.css";
import Link from "next/link";
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const HideOnScroll = (props: Props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
const Header = () => {
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
    <HideOnScroll>
      <AppBar className={classes.header} color="transparent">
        <Toolbar className={classes.toolbar}>
          <span className={classes.title}>Petercheng</span>
          <div className={classes.menuList}>
            {menuOptionList.map(({ id, link, display }) => {
              return (
                <Link href={link} key={id}>
                  <a className={classes.option}>{display}</a>
                </Link>
              );
            })}
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
