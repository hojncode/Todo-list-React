import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./routes/Signup";
function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
