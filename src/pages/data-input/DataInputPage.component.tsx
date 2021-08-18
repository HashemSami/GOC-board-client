import { FC } from "react";
import { DataInputContainer } from "./DataInput.styles";

import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";

import { Switch, Route, Redirect } from "react-router-dom";

const DataInputPage: FC = () => {
  const match = useRouteMatch();
  return (
    <DataInputContainer className="App">
      <Switch>
        <Route path={`${match.path}/newreport`}>
          <h1>Data input</h1>
        </Route>
      </Switch>
    </DataInputContainer>
  );
};

export default DataInputPage;
