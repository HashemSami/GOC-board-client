import { FC } from "react";

import { NavContainer } from "./SideNave.styles";
// import { useRouteMatch } from "react-router-dom";

const SideNav: FC = ({ children }) => {
  // const match = useRouteMatch();
  return <NavContainer>{children}</NavContainer>;
};

export default SideNav;
