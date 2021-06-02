import React from "react";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// core components
import UserHeader from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/profile.js";

import APIService from '../../services/api.service'
import AuthService from '../../services/auth.service'
import swal from "sweetalert";

const useStyles = makeStyles(componentStyles);

function CreateVideos() {
  const classes = useStyles();
  const theme = useTheme();
  const { register, handleSubmit, reset, control } = useForm();

  const onSubmit = ({ title, description, file, photo }) => {
    const created_by = AuthService.getUserId()
    const status = 1
    APIService.uploadVideoContent(title, description, created_by, photo, file, status)
      .then(function (res) {
        reset()
        swal("Success!", "Video Content Created Successfully!", "success")
      })
      .catch(function (res) {
        swal("Failed!", "Please Try Again!", "error");
      })
  };

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
              Create Video Content
            </Box>
            <form className={classes.plLg4} onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Video Title"
                        name="title"
                        required
                        {...register("title")}
                      />
                    </FormControl>
                  </FormGroup>
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
                        placeholder="Video Title"
                        name="title"
                        required
                        {...register("title")}
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
                      <FilledInput
                        autoComplete="off"
                        multiline
                        placeholder="A brief description about the content of the video"
                        rows="5"
                        name="description"
                        {...register("description")}
                        required
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
                      {/* Have to use FilledInput, Trying with input for now */}
                      <input
                        type="file"
                        name="photo"
                        accept=".jpg,.jpeg,.png"
                        {...register("photo")}
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
                      <input
                        autoComplete="off"
                        type="file"
                        name="file"
                        accept=".mp4"
                        {...register("file")}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Button
                  variant="contained"
                  classes={{ root: classes.buttonRoot }}
                  type="submit"
                >
                  Create Video
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default CreateVideos;
