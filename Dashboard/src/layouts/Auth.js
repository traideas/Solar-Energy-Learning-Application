import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
// core components
import AuthNavbar from "components/Navbars/AuthNavbarNew.js";
import AuthHeader from "components/Headers/AuthHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

import componentStyles from "assets/theme/layouts/auth.js";

const useStyles = makeStyles(componentStyles);

const Auth = () => {
  // const classes = useStyles();
  // const mainContent = React.useRef(null);
  // const location = useLocation();

  // React.useEffect(() => {
  //   document.body.classList.add(classes.bgDefault);
  //   return () => {
  //     document.body.classList.remove(classes.bgDefault);
  //   };
  // });
  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);
  const theme = useTheme();
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
     
        {/* <AuthNavbar />
        <AuthHeader />
       
        <Container
          component={Box}
          maxWidth="xl"
          marginTop="-8rem"
          paddingBottom="3rem"
          position="relative"
          zIndex="101"
        >
          <Box component={Grid} container justifyContent="center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Box>
        </Container> */}

        <Box component={Grid} container style={{ width: "100%", margin:0 }}>
          <Grid
            item
            xs={12}
            lg={8}
            md={8}
            style={{
              background:
                "linear-gradient(87deg," +
                "#1171ef," +
                theme.palette.info.main + ")"
               //backgroundColor:"#6577B3"
                
            }}
          >
            <AuthNavbar />
            {/* <AuthHeader /> */}
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
            <AuthFooter />
          </Grid>
        </Box>
      
      {/* <AuthFooter /> */}
    </>
  );
};

export default Auth;
