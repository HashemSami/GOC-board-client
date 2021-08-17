import { FC } from "react";

import { HeaderContainer } from "./Header.styles";

import HeaderNav from "../navs/headerNav/HeaderNav.component";

const Header: FC = () => {
  return (
    <HeaderContainer>
      <h1>GOC board</h1>
      <HeaderNav />
    </HeaderContainer>
  );
};

export default Header;
