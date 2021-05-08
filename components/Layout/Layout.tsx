import React, { useState } from "react";
import { option } from "../../utils/globalInterface";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "./Layout.module.scss";
import ClassName from "classnames";

interface Props {
  menuOptionList: option[];
  children?: React.ReactNode;
}
const Layout = (props: Props) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const onCloseMenu: () => void = () => {
    setMenuOpen(false);
  };

  const onOpenMenu: () => void = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <Header menuOptionList={props.menuOptionList} onOpenMenu={onOpenMenu} />
      <div className={ClassName(classes.wrapper)}>
        <Sidebar
          menuOptionList={props.menuOptionList}
          onCloseMenu={onCloseMenu}
          isMenuOpen={isMenuOpen}
        />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
