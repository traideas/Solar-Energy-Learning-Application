import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./Layouts/Auth/AuthLayout";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import { Login } from "./Login/Login";

const App = () => {
  return (
    <Switch>
      {/* <Route path="/auth" render={(props) => <AuthLayout {...props} />} /> */}
      <AuthLayout path="/login" component={Login} />
      <Route path="/" render={(props) => <DashboardLayout {...props} />} />
    </Switch>
  )
}

export default App