import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";
import swal from "sweetalert";
//Api Services
import ApiService from "../../services/api.service";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles(componentStyles);

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (AuthService.isAdmin()) {
      ApiService.getUserDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((err) => console.log(err));
    } else if (AuthService.isTeacher()) {
      ApiService.getUserTeacherDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setUserDetails(res.data.created_by);
        })
        .catch((err) => console.log(err));
    } else {
      ApiService.getUserStudentDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setUserDetails(res.data.created_by);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const [userFullDetails, setuserFullDetails] = useState([]);

  useEffect(() => {
    if (AuthService.isAdmin()) {
      ApiService.getUserDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setuserFullDetails(res.data);
        })
        .catch((err) => console.log(err));
    } else if (AuthService.isTeacher()) {
      ApiService.getUserTeacherDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setuserFullDetails(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      ApiService.getUserStudentDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setuserFullDetails(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData();
    if (AuthService.isAdmin()) {
      formData.append(
        "first_name",
        data.first_name == "" ? userDetails.first_name : data.first_name
      );
      formData.append(
        "last_name",
        data.last_name == "" ? userDetails.last_name : data.last_name
      );
      formData.append("username", userDetails.username);
      formData.append(
        "email",
        data.email == "" ? userDetails.email : data.email
      );
      formData.append("password", data.password);

      if (data.photo[0] != undefined) {
        formData.append("photo", data.photo[0]);
      }
    }
    if (AuthService.isTeacher()) {
      formData.append(
        "created_by.first_name",
        data.first_name == "" ? userDetails.first_name : data.first_name
      );
      formData.append(
        "created_by.last_name",
        data.last_name == "" ? userDetails.last_name : data.last_name
      );
      formData.append("created_by.username", userDetails.username);
      formData.append(
        "created_by.email",
        data.email == "" ? userDetails.email : data.email
      );
      formData.append("created_by.password", data.password);
      if (data.photo[0] != undefined) {
        formData.append("created_by.photo", data.photo[0]);
      }
      formData.append("institute_name", userFullDetails.institute_name);
      formData.append("is_verified", userFullDetails.is_verified);
    } else {
      formData.append(
        "created_by.first_name",
        data.first_name == "" ? userDetails.first_name : data.first_name
      );
      formData.append(
        "created_by.last_name",
        data.last_name == "" ? userDetails.last_name : data.last_name
      );
      formData.append("created_by.username", userDetails.username);
      formData.append(
        "created_by.email",
        data.email == "" ? userDetails.email : data.email
      );
      formData.append("created_by.password", data.password);

      if (data.photo[0] != undefined) {
        formData.append("created_by.photo", data.photo[0]);
      }
      formData.append("school_section", userFullDetails.school_section);
      formData.append("school_roll", userFullDetails.school_roll);
    }

    ApiService.updateProfile(formData, userDetails.id)
      .then(function (res) {
        swal("Success!", "Profile Updated Successfully!", "success");
        window.location.reload();
      })
      .catch(function (res) {
        swal("Failed!", "Please Try Again!", "error");
      });
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-3rem"
        marginBottom="6rem"
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
                            <input
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              className="MuiInputBase-input"
                              autoComplete="off"
                              type="text"
                              value={userDetails.username}
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
                            <input
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              className="MuiInputBase-input"
                              autoComplete="off"
                              type="email"
                              defaultValue={userDetails.email}
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
                            <input
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              className="MuiInputBase-input"
                              autoComplete="off"
                              type="text"
                              defaultValue={userDetails.first_name}
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
                            <input
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              className="MuiInputBase-input"
                              autoComplete="off"
                              type="text"
                              defaultValue={userDetails.last_name}
                              required
                              {...register("last_name")}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>New Password</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <input
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              className="MuiInputBase-input"
                              autoComplete="off"
                              type="password"
                              placeholder="Password"
                              {...register("password")}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>Profile Photo</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <input
                              type="file"
                              name="photo"
                              accept=".jpg,.jpeg,.png"
                              {...register("photo")}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>

                    <Box
                      textAlign="center"
                      marginTop="1.5rem"
                      marginBottom="1.5rem"
                    >
                      <Button color="primary" variant="contained" type="submit">
                        Update Profile
                      </Button>
                    </Box>
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
                      src={
                        userDetails.photo == null
                          ? require("assets/img/theme/defaultImage.png").default
                          : userDetails.photo
                      }
                      alt="..."
                      maxWidth="200px"
                      height="200px"
                      borderRadius="100%"
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
                    {userDetails.first_name} {userDetails.last_name}
                  </Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Username: {userDetails.username}
                  </Box>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Email: {userDetails.email}
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
