import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./Layouts/Auth/AuthLayout";

const App = () => {
  return (
    <Switch>
      <Route path="/" render={(props) => <AuthLayout {...props} />} />
    </Switch>
  )
}

export default App