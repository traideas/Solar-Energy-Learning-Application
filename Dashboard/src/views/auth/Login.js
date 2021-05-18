import React from "react";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
/* import CardHeader from "@material-ui/core/CardHeader"; */
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
//auth.service imports
import AuthService from '../../services/auth.service'

const useStyles = makeStyles(componentStyles);

function Login() {
  const classes = useStyles();
  const theme = useTheme();
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = ({ username, password }) => {
    AuthService.login(username, password)
    reset()
  }
  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1rem"
              marginTop=".5rem"
              fontSize="1.2rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Sign in with credentials
              </Box>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1rem!important"
              >
                <FilledInput
                  autoComplete="off"
                  type="text"
                  placeholder="User Name"
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
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" />}
                label="Remeber me"
                labelPlacement="end"
                classes={{
                  root: classes.formControlLabelRoot,
                  label: classes.formControlLabelLabel,
                }}
              />
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <Button color="primary" variant="contained" type="submit">
                  Sign in
                </Button>
              </Box>
            </form>
            
          </CardContent>
        </Card>
        <Grid container component={Box} marginTop="1rem">
          <Grid item xs={6} component={Box} textAlign="left">
            <a
              href="#admui"
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Forgot password
            </a>
          </Grid>
          <Grid item xs={6} component={Box} textAlign="right">
            <a
              href="/auth/register"
              className={classes.footerLinks}
            >
              Create new account
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
