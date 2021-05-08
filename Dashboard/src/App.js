import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./Layouts/Auth/AuthLayout";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";

const App = () => {
  return (
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/" render={(props) => <DashboardLayout {...props} />} />
    </Switch>
  )
}

export default App