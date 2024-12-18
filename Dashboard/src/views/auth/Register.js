import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
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
import School from "@material-ui/icons/School";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
// core components
import componentStyles from "assets/theme/views/auth/register.js";
//Services
import AuthService from "../../services/auth.service";
import ApiService from "../../services/api.service";
import { Link } from "react-router-dom";

import pdf from "./guide.pdf";

const useStyles = makeStyles(componentStyles);

function Register() {
  const classes = useStyles();
  const theme = useTheme();
  const { register, handleSubmit, reset } = useForm();
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    ApiService.getSchoolList()
      .then(({ data }) => setSchools(data))
      .catch((err) => console.log(err));
  }, []);
  const onSubmit = ({
    first_name,
    last_name,
    username,
    email,
    password,
    institute_name,
    userType,
  }) => {
    if (userType == 1) {
      AuthService.registerStudent(
        first_name,
        last_name,
        username,
        email,
        password,
        institute_name
      )
        .then(function (response) {
          reset();
          swal("Congratulations!", "Account Created Successfully!", "success");
          window.location.replace("/auth/login");
        })
        .catch(function (error) {
          swal("Registration Failed!", "Please Try Again!", "error");
        });
    } else {
      AuthService.registerTeacher(
        first_name,
        last_name,
        username,
        email,
        password,
        institute_name
      )
        .then(function (response) {
          reset();
          swal("Congratulations!", "Account Created Successfully!", "success");
          window.location.replace("/auth/login");
        })
        .catch(function (error) {
          swal("Registration Failed!", "Please Try Again!", "error");
        });
    }
  };

  return (
    <>
      <Box component={Grid} container style={{ width: "100%", margin: 0 }}>
        {" "}
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
          <Card classes={{ root: classes.cardRoot }}>
            <CardContent classes={{ root: classes.cardContent }}>
              <Box
                color={theme.palette.gray[600]}
                textAlign="center"
                marginBottom="1.5rem"
                fontSize="1.3rem"
              >
                <Box fontSize="80%" fontWeight="700" component="small">
                  Sign up with credentials
                </Box>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
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
                  width="100%"
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
                  <Select
                    defaultValue=""
                    IconComponent={KeyboardArrowDown}
                    startAdornment={
                      <InputAdornment position="start">
                        <School /> &nbsp; School
                      </InputAdornment>
                    }
                    name="institute_name"
                    {...register("institute_name")}
                  >
                    <MenuItem value="" disabled>
                      Select Your School
                    </MenuItem>
                    {schools.map(({ school_name, id }) => (
                      <MenuItem key={id} value={id}>
                        {school_name}
                      </MenuItem>
                    ))}
                  </Select>
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
                    placeholder="Username"
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
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1.5rem!important"
                >
                  <Select
                    defaultValue=""
                    IconComponent={KeyboardArrowDown}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountBoxIcon /> &nbsp; User Type
                      </InputAdornment>
                    }
                    name="userType"
                    {...register("userType")}
                    required
                  >
                    <MenuItem value="" disabled>
                      Choose your Role
                    </MenuItem>
                    <MenuItem value="1">Student</MenuItem>
                    <MenuItem value="2">Teacher</MenuItem>
                  </Select>
                </FormControl>

                <Box
                  textAlign="center"
                  marginTop="1.5rem"
                  marginBottom="1.5rem"
                >
                  <Button color="primary" variant="contained" type="submit">
                    Create Account
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
            Already have an account? <Link to="/auth/login">Log in</Link>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default Register;
