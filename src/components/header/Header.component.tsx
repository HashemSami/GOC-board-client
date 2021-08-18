import { FC } from "react";

import { HeaderContainer, HeaderTitle } from "./Header.styles";

import HeaderNav from "../navs/header-nav/HeaderNav.component";

const Header: FC = () => {
  return (
    <HeaderContainer onScroll={(e) => console.log(e)}>
      <HeaderTitle>
        <div>GOC Data Display</div>
      </HeaderTitle>
      <HeaderNav />
    </HeaderContainer>
  );
};

export default Header;
