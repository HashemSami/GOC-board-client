import { FC } from "react";

import {
  DataInputNavContainer,
  NavItemContainer,
} from "./DataInputSideNav.styles";
import { useRouteMatch } from "react-router-dom";

const DataInputSideNav: FC = () => {
  const match = useRouteMatch();
  return (
    <DataInputNavContainer>
      <NavItemContainer to={`${match.path}/tdwellreport`}>
        New TD Report
      </NavItemContainer>
      <NavItemContainer to="/main/datainput">Other</NavItemContainer>
    </DataInputNavContainer>
  );
};

export default DataInputSideNav;
