import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import { option } from "../../utils/globalInterface";
import classes from "./Sidebar.module.scss";
import Link from "next/link";
import ClassName from "classnames";
interface Props {
  onCloseMenu: () => void;
  isMenuOpen: boolean;
  menuOptionList: option[];
}
const sidebar = ({ onCloseMenu, isMenuOpen, menuOptionList }: Props) => {
  return (
    <Drawer anchor="right" open={isMenuOpen} onClose={onCloseMenu}>
      <div onKeyDown={onCloseMenu} className={ClassName(classes.sideBar)}>
        {menuOptionList.map(({ id, link, display }) => {
          return (
            <ListItem key={id}>
              <Link href={link}>
                <a className={classes.option}>{display}</a>
              </Link>
            </ListItem>
          );
        })}
      </div>
    </Drawer>
  );
};

export default sidebar;
