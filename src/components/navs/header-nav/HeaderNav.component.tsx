import { FC } from "react";

import { HeaderNavContainer, NavItemContainer } from "./HeaderNav.styles";
import { useRouteMatch } from "react-router-dom";

const HeaderNav: FC = () => {
  const match = useRouteMatch();
  return (
    <HeaderNavContainer>
      <NavItemContainer to="/main/dashboards/maindisplay">
        Dashboards
      </NavItemContainer>
      <NavItemContainer to="/main/datainput/tdwellreport">
        Data Input
      </NavItemContainer>
    </HeaderNavContainer>
  );
};

export default HeaderNav;
