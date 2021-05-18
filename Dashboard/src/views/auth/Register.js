import React from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
/* import CardHeader from "@material-ui/core/CardHeader"; */
/* import Checkbox from "@material-ui/core/Checkbox";
 */import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
/* import FormControlLabel from "@material-ui/core/FormControlLabel";*/
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import School from "@material-ui/icons/School";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
// core components
import componentStyles from "assets/theme/views/auth/register.js";

const useStyles = makeStyles(componentStyles);

function Register() {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = data => {
    axios.post('http://127.0.0.1:8000/teacher/', {
      user: {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        password: data.password
      },
      institute_name: data.institute_name,

    })
      .then(function (response) {
        reset()
        swal("Congratulations!", "Account Created Successfully!", "success")
      })
      .catch(function (error) {
        swal("Registration Failed!", "Please Try Again!", "error");
      });
  }
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12} lg={6} md={8}>
        <Card classes={{ root: classes.cardRoot }}>

          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1.5rem"
              marginTop=".5rem"
              fontSize="1.2rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Sign up with credentials
              </Box>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>

              <FormControl
                variant="filled"
                component={Box}
                width="48%"
                marginBottom="1.5rem!important"

              >
                <FilledInput
                  autoComplete="off"
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  required
                  {...register("first_name")}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountBoxIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                variant="filled"
                component={Box}
                width="48%"
                marginBottom="1.5rem!important"
                style={{ float: "right" }}
              >
                <FilledInput
                  autoComplete="off"
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  required
                  {...register("last_name")}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountBoxIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1.5rem!important"
              >
                <FilledInput
                  autoComplete="off"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  {...register("email")}
                  startAdornment={
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1.5rem!important"
              >
                <FilledInput
                  autoComplete="off"
                  type="text"
                  placeholder="Institute"
                  name="institute_name"
                  required
                  {...register("institute_name")}
                  startAdornment={
                    <InputAdornment position="start">
                      <School />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1.5rem!important"
              >
                <FilledInput
                  autoComplete="off"
                  type="text"
                  placeholder="User Name"
                  name="username"
                  required
                  {...register("username")}
                  startAdornment={
                    <InputAdornment position="start">
                      <FingerprintIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1.5rem!important"
              >
                <FilledInput
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  {...register("password")}
                  startAdornment={
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* <Box
                fontStyle="italic"
                fontSize="1rem"
                color={theme.palette.gray[600]}
                marginBottom=".5rem"
              >
                <Box component="small" fontSize="80%">
                  password strength:{" "}
                  <Box
                    component="span"
                    fontWeight="700"
                    color={theme.palette.success.main}
                  >
                    strong
                </Box>
                </Box>
              </Box> */}
              {/*  <FormControlLabel
                value="end"
                control={<Checkbox color="primary" />}
                label={
                  <>
                    I agree with the{" "}
                    <Box
                      color={theme.palette.primary.main}
                      component="a"
                      textDecoration="none"
                    >
                      Privacy Policy
                  </Box>
                  </>
                }
                labelPlacement="end"
                classes={{
                  root: classes.formControlLabelRoot,
                  label: classes.formControlLabelLabel,
                }}
              /> */}
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <Button color="primary" variant="contained" type="submit">
                  Create account
              </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Register;
