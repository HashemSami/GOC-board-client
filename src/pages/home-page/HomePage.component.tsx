import { FC, useState } from "react";
import { HomePageContainer, Item } from "./HomePage.styles";

import { Route, Switch } from "react-router-dom";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";

import DashboardPage from "../dashboards-page/DashboardPage.component";
import DataInputPage from "../data-input/DataInputPage.component";
// import { useActions } from "../../hooks/useActions";

const HomePage: FC = () => {
  // const { setWeekendDays } = useActions();
  const match = useRouteMatch();

  console.log(match.path);
  return (
    <HomePageContainer>
      <Switch>
        <Route path={`${match.path}/dashboards`}>
          <Item>
            <DashboardPage />
          </Item>
        </Route>
        <Route path={`${match.path}/datainput`}>
          <Item>
            <DataInputPage />
          </Item>
        </Route>
      </Switch>
    </HomePageContainer>
  );
};

export default HomePage;
