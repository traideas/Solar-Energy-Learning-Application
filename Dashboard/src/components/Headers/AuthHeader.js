import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// core components
import componentStyles from "assets/theme/components/auth-header.js";

const useStyles = makeStyles(componentStyles);

const AuthHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Box
        className={classes.header}
        position="relative"
        paddingTop="8rem"
        paddingBottom="8rem"
      >
        <Container maxWidth="xl">
          <Box marginBottom="6rem" textAlign="center">
            <Box
              component={Grid}
              container
              justifyContent="center"
              color={theme.palette.white.main}
            >s
              <Grid item lg={5} md={6} xs={12}>
                <h1>Welcome!</h1>
                <Box
                  component="p"
                  color={theme.palette.gray[400]}
                  lineHeight="1.7"
                  fontSize="1rem"
                >

                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
        
      </Box>
    </>
  );
};

export default AuthHeader;
