import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// core components
import UserHeader from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);

function CreateVideos() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <UserHeader />
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent>
            <Box
              component={Typography}
              variant="h6"
              color={theme.palette.gray[600] + "!important"}
              paddingTop=".25rem"
              paddingBottom=".25rem"
              fontSize=".75rem!important"
              letterSpacing=".04em"
              marginBottom="1.5rem!important"
              classes={{ root: classes.typographyRootH6 }}
            >
              Video Content Information
            </Box>
            <div className={classes.plLg4}>
              <Grid container>
                <Grid item xs={12} lg={12}>
                  <FormGroup>
                    <FormLabel>Video Title</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        component={FilledInput}
                        autoComplete="off"
                        type="text"
                        defaultValue="E.g: How to Make Solar Batteries"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormLabel>Video Description</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        component={FilledInput}
                        autoComplete="off"
                        multiline
                        defaultValue="A brief Description about the content of the video"
                        rows="4"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormGroup>
                    <FormLabel>Upload Thumbnil</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        component={FilledInput}
                        autoComplete="off"
                        type="text"
                        defaultValue="E.g: How to Make Solar Batteries"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormGroup>
                    <FormLabel>Upload Video</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        component={FilledInput}
                        autoComplete="off"
                        type="text"
                        defaultValue="E.g: How to Make Solar Batteries"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Button
                  variant="contained"
                  classes={{ root: classes.buttonRoot }}
                >
                  Create Video
                </Button>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default CreateVideos;
