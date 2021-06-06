import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FilledInput from "@material-ui/core/FilledInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";
import swal from 'sweetalert';
//Api Services
import ApiService from "../../services/api.service";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles(componentStyles);

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = ({ first_name, last_name, username, email, password, institute_name }) => {
    AuthService.register(first_name, last_name, username, email, password, institute_name)
      .then(function (response) {
        reset()
        swal("Congratulations!", "Account Created Successfully!", "success")
      })
      .catch(function (error) {
        swal("Registration Failed!", "Please Try Again!", "error");
      });
  }

  const [userDetails, setUserDetails] = useState({
    user: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      photo: "",
    },
    institute_name: "",
  });
  useEffect(() => {
    ApiService.getUserDetails(AuthService.getUserId())
      .then((res) => setUserDetails(res.data))
      .catch((err) => console.log(err));
  }, []);
  const { user, institute_name } = userDetails;
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootSecondary,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        My Account
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
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
                  User Information
                </Box>
                <div className={classes.plLg4}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>User Name</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <FilledInput
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"

                              autoComplete="off"
                              type="text"
                              value={user.username}
                              {...register("username")}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>Email</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <FilledInput
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"

                              autoComplete="off"
                              type="email"
                              defaultValue={user.email}

                              required
                              {...register("email")}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>First name</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <FilledInput
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"

                              autoComplete="off"
                              type="text"
                              defaultValue={user.first_name}
                              required
                              {...register("first_name")}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <FilledInput
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"

                              autoComplete="off"
                              type="text"
                              defaultValue={user.last_name}
                              required
                              {...register("last_name")}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            xl={4}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.order1 + " " + classes.marginBottomXl0 }}
          >
            <Card classes={{ root: classes.cardRoot }}>
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box position="relative">
                    <Box
                      component="img"
                      src={(user.photo == null) ? require("assets/img/theme/defaultImage.png").default : user.photo}
                      alt="..."
                      maxWidth="180px"
                      borderRadius="50%"
                      position="absolute"
                      left="50%"
                      boxShadow={boxShadows.boxShadow + "!important"}
                      className={classes.profileImage}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box
                component={CardHeader}
                border="0!important"
                textAlign="center"
                paddingBottom="0!important"
                paddingTop="8rem!important"
                classes={{ root: classes.cardHeaderRootProfile }}
              ></Box>
              <Box
                component={CardContent}
                classes={{ root: classes.ptMd4 }}
                paddingTop="0!important"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      padding="1rem 0"
                      justifyContent="center"
                      display="flex"
                      className={classes.mtMd5}
                    >
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      ></Box>
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      ></Box>
                      <Box textAlign="center" padding=".875rem"></Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Typography variant="h3">
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    User Name: {user.username}
                  </Box>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Email: {user.email}
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="1rem"
                  >
                    <Box
                      component={School}
                      width="1.25rem!important"
                      height="1.25rem!important"
                      marginRight=".5rem"
                    ></Box>
                    {institute_name}
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
