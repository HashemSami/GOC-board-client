import { FC } from "react";

import { HeaderNavContainer, NavItemContainer } from "./HeaderNav.styles";

const HeaderNav: FC = () => {
  return (
    <HeaderNavContainer>
      <NavItemContainer to="/main/dashboards/maindisplay">
        Dashboards
      </NavItemContainer>
      <NavItemContainer to="/main/datainput/newreport">
        Data Input
      </NavItemContainer>
    </HeaderNavContainer>
  );
};

export default HeaderNav;
