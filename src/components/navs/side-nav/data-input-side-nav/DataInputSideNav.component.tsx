import { FC } from "react";

import { NavItemContainer } from "./DataInputSideNav.styles";
import { useRouteMatch } from "react-router-dom";

const DataInputSideNav: FC = () => {
  const match = useRouteMatch();
  return (
    <>
      <NavItemContainer to={`${match.path}/tdwellreport`}>
        New TD Report
      </NavItemContainer>
      <NavItemContainer to="/main/datainput">Other</NavItemContainer>
    </>
  );
};

export default DataInputSideNav;
