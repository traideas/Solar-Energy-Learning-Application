import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/user-header.js";
//Api Services
import ApiService from "../../services/api.service";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles(componentStyles);

const UserHeader = () => {
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    ApiService.getUserDetails(AuthService.getUserId())
      .then((res) => {
        setUserDetails(res.data)

      })
      .catch((err) => console.log(err));
  }, []);
  const classes = useStyles();

  return (
    <>
      <Box
        paddingTop="3rem"
        paddingBottom="8rem"
        alignItems="center"
        display="flex"
        className={classes.wrapperBox}
        minHeight="400px"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          className={classes.overlayBox}
        />
        <Container
          display="flex"
          alignItems="center"
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <Grid container>
            <Grid item xs={12} md={10} lg={7}>
              <Typography
                variant="h1"
                classes={{ root: classes.typographyRootH1 }}
              >

                Hello, {userDetails.first_name} {userDetails.last_name}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserHeader;
