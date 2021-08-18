import { FC } from "react";

import {
  DashboardNavContainer,
  NavItemContainer,
} from "./DashboardSideNav.styles";

const DashboardSideNav: FC = () => {
  return (
    <DashboardNavContainer>
      <NavItemContainer to="/main/dashboards/maindisplay">
        Main Display
      </NavItemContainer>
      <NavItemContainer to="/main/datainput">Data Input</NavItemContainer>
    </DashboardNavContainer>
  );
};

export default DashboardSideNav;
