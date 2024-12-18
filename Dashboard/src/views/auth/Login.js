import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
//auth.service imports
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import pdf from "./guide.pdf";

const useStyles = makeStyles(componentStyles);

function Login() {
  const classes = useStyles();
  const theme = useTheme();
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ username, password }) => {
    AuthService.login(username, password)
      .then(function (response) {
        window.location.replace("/admin/index");
        /* swal("Congratulations!", "Account Created Successfully!", "success") */
      })
      .catch(function (error) {
        swal("Login Failed!", "Please Check Your Credentials!", "error");
      });
  };
  return (
    <>
      <Box component={Grid} container style={{ width: "100%", margin: 0 }}>
        <Grid
          item
          xs={11}
          lg={10}
          md={10}
          style={{ margin: "auto", marginTop: "3rem" }}
        >
          <Box
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginBottom: "1rem",
            }}
          >
            <a href={pdf} target="_blank">
              User's Guide
            </a>
          </Box>
          <Card
            classes={{ root: classes.cardRoot }}
            style={
              {
                //backgroundColor: "#B2F9FC",
              }
            }
          >
            <CardContent classes={{ root: classes.cardContent }}>
              <Box
                color={theme.palette.gray[600]}
                textAlign="center"
                marginBottom="1.5rem"
                fontSize="1.3rem"
              >
                <Box fontSize="100%" fontWeight="700" component="small">
                  Sign in with credentials
                </Box>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                  variant="filled"
                  s
                  component={Box}
                  width="100%"
                  marginBottom="1rem!important"
                >
                  <FilledInput
                    autoComplete="off"
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    }
                    {...register("username")}
                  />
                </FormControl>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1rem!important"
                >
                  <FilledInput
                    autoComplete="off"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                    {...register("password")}
                  />
                </FormControl>

                <Box
                  textAlign="center"
                  marginTop="1.5rem"
                  marginBottom="1.5rem"
                >
                  <Button color="primary" variant="contained" type="submit">
                    Sign in
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
          <Box
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "18px",
            }}
          >
            Don't have an account? <Link to="/auth/register">Sign up</Link>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
