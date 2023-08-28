import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";
import SmallSidebar from "./SmallSidebar";
import { NavLink } from "react-router-dom";

const NavLinks = (props) => {
  const { user, toggleSidebar } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === "admin" && role !== "admin") {
          return;
        }
        return (
          <NavLink
            to={path}
            key={text}
            className={"nav-link"}
            onClick={props.isBigSideBar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
