import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classes from "./Header.module.scss";
import Link from "next/link";
import * as ScreenUtil from "../../utils/screenUtil";
import { option } from "../../utils/globalInterface";
import ClassName from "classnames";

interface Props {
  menuOptionList: option[];
  onOpenMenu: () => void;
}
const Header = ({ menuOptionList, onOpenMenu }: Props) => {
  return (
    <AppBar className={classes.header} color="transparent">
      <Toolbar className={classes.toolbar}>
        {ScreenUtil.isMobile() && <div />}
        <span className={classes.title}>petercheng</span>
        {ScreenUtil.isMobile() ? (
          <IconButton onClick={() => onOpenMenu()}>
            <MenuIcon />
          </IconButton>
        ) : (
          <div className={classes.menuList}>
            {menuOptionList.map(({ id, link, display }) => {
              return (
                <Link href={link} key={id}>
                  <a className={ClassName(classes.option)}>{display}</a>
                </Link>
              );
            })}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
