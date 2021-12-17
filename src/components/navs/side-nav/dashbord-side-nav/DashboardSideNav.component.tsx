import { FC } from "react";

import { NavItemContainer } from "./DashboardSideNav.styles";

import { useRouteMatch } from "react-router-dom";

const DashboardSideNav: FC = () => {
  const match = useRouteMatch();
  return (
    <>
      <NavItemContainer to={`${match.path}/maindisplay`}>
        Main Display
      </NavItemContainer>
      <NavItemContainer to="/main/datainput">Other</NavItemContainer>
    </>
  );
};

export default DashboardSideNav;
