import { FC } from "react";
import { DashboardPageContainer, SideNavDiv } from "./DashboardPage.styles";

import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";

import { Switch, Route, Redirect } from "react-router-dom";

import MainDisplay from "./main-display/MainDisplay.component";
import DashboardSideNav from "../../components/navs/side-nav/dashbord-side-nav/DashboardSideNav.component";
import SideNav from "../../components/navs/side-nav/SideNav.component";

const DashboardPage: FC = () => {
  const match = useRouteMatch();
  return (
    <DashboardPageContainer>
      <SideNav>
        <DashboardSideNav />
      </SideNav>
      <SideNavDiv />
      <Switch>
        <Route path={`${match.path}/maindisplay`}>
          <MainDisplay />
        </Route>
      </Switch>
    </DashboardPageContainer>
  );
};

export default DashboardPage;
