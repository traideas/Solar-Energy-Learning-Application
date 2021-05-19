import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards'

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AuthService from "./services/auth.service";

const requireLogin = (to, from, next) => {
  if(to.meta.auth) {
    if(AuthService.isLogedin()) {
      next()
    }
    next.redirect("/auth/login")
  } else {
    next()
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
    <GuardProvider guards={[requireLogin]}>
      <Switch>
        <GuardedRoute path="/admin" render={(props) => <AdminLayout {...props} />} meta={{ auth: true }} />
        <GuardedRoute path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </GuardProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#root")
);
