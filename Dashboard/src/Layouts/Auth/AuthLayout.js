import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

//Material Ui/Components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

//Core Components
import AuthNavbar from './AuthNavbar'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'

import componentStyles from "./authLayoutTheme";

import routes from "../../routes";
const useStyles = makeStyles(componentStyles)

const AuthLayout = () => {
    const classes = useStyles();
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.body.classList.add(classes.bgDefault);
        return () => {
            document.body.classList.remove(classes.bgDefault);
        };
    });
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

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
            <div className="main-content" ref={mainContent}>
                <AuthNavbar />
                <AuthHeader />
                {/* Page content */}
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
                </Container>
            </div>
            <AuthFooter />
        </>
    );
}

export default AuthLayout