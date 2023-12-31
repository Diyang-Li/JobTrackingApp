import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "./../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
const BigSidebar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSideBar={true} />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
