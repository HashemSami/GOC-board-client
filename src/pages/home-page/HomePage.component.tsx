import { FC, useState } from "react";
import { HomePageContainer, Item } from "./HomePage.styles";

import { Route, Switch } from "react-router-dom";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";

import MainDisplay from "../main-display/MainDisplay.component";

// import { useActions } from "../../hooks/useActions";

const HomePage: FC = () => {
  // const { setWeekendDays } = useActions();
  const match = useRouteMatch();

  console.log(match.path);
  return (
    <HomePageContainer>
      <Switch>
        <Route exact path={`${match.path}`}>
          <Item>
            <MainDisplay />
          </Item>
        </Route>
        <Route path={`${match.path}/maind`}>
          <Item>
            <p>Helsssslo</p>
          </Item>
        </Route>
      </Switch>
    </HomePageContainer>
  );
};

export default HomePage;
