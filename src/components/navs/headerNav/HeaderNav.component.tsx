import { FC } from "react";

import { HeaderNavContainer, NavItemContainer } from "./HeaderNav.styles";

const HeaderNav: FC = () => {
  return (
    <HeaderNavContainer>
      <NavItemContainer>Dashboards</NavItemContainer>
      <NavItemContainer>Data Input</NavItemContainer>
      <NavItemContainer>Data Input</NavItemContainer>
      <NavItemContainer>Data Input</NavItemContainer>
      <NavItemContainer>Data Input</NavItemContainer>
    </HeaderNavContainer>
  );
};

export default HeaderNav;
