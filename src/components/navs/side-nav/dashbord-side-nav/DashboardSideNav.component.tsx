import { FC } from "react";

import {
  DashboardNavContainer,
  NavItemContainer,
} from "./DashboardSideNav.styles";

import { useRouteMatch } from "react-router-dom";

const DashboardSideNav: FC = () => {
  const match = useRouteMatch();
  return (
    <DashboardNavContainer>
      <NavItemContainer to={`${match.path}/maindisplay`}>
        Main Display
      </NavItemContainer>
      <NavItemContainer to="/main/datainput">Other</NavItemContainer>
    </DashboardNavContainer>
  );
};

export default DashboardSideNav;
