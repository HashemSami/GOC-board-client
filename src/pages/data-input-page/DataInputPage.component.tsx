import { FC } from "react";
import { DataInputPageContainer, SideNavDiv } from "./DataInputPage.styles";

import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";

import { Switch, Route, Redirect } from "react-router-dom";

import DataInputSideNav from "../../components/navs/side-nav/data-input-side-nav/DataInputSideNav.component";
import TdWellReport from "./td-well-report/TdWellReport.component";
import SideNav from "../../components/navs/side-nav/SideNav.component";

const DataInputPage: FC = () => {
  const match = useRouteMatch();
  return (
    <DataInputPageContainer className="App">
      <SideNav>
        <DataInputSideNav />
      </SideNav>
      <SideNavDiv />
      <Switch>
        <Route path={`${match.path}/tdwellreport`}>
          <TdWellReport />
        </Route>
      </Switch>
    </DataInputPageContainer>
  );
};

export default DataInputPage;
