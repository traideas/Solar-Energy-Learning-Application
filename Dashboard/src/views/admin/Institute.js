import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Typography from "@material-ui/core/Typography";

// core components
import UserHeader from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/components";
import componentStylesButtons from "assets/theme/components/button.js";
import FilledInput from "@material-ui/core/FilledInput";
import ApiService from "../../services/api.service";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles(componentStyles);
const useStylesButtons = makeStyles(componentStylesButtons);

const TableList = ({ list, index }) => {
  const classes = useStyles();

  return (
    <TableRow hover key={list.id}>
      <TableCell
        classes={{
          root: classes.tableCellRoot + " " + classes.tableCellRootBodyHead,
        }}
        variant="head"
      >
        {(index = index + 1)}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {list.school_name}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {list.student_count}
      </TableCell>
    </TableRow>
  );
};

const Institute = () => {
  const classes = {
    ...useStyles(),
    ...useStylesButtons(),
  };
  const theme = useTheme();
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    ApiService.getSchoolList()
      .then(({ data }) => setSchools(data))
      .catch((err) => console.log(err));
  }, []);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = ({ school_name }) => {
    console.log(school_name, AuthService.getUserId());
    ApiService.postSchoolList(school_name, AuthService.getUserId())
      .then((res) => {
        swal("Nice!", "School Added Successfully!", "success");
        window.location.reload();
      })
      .catch((err) => {
        swal("Sorry!", "Unable to add school!", "warning");
        reset()
      });
  };
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid
          container
          component={Box}
          marginBottom="39px"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    component={Typography}
                    variant="h4"
                    color={theme.palette.gray[600] + "!important"}
                    paddingTop=".25rem"
                    paddingBottom=".25rem"
                    fontSize=".75rem!important"
                    letterSpacing=".04em"
                    marginBottom="1.5rem!important"
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    Create School
                  </Box>
                  <FormGroup>
                    <FormLabel>
                      School Name <b style={{ color: "red" }}>*</b>
                    </FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginTop=".5rem!important"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        component={FilledInput}
                        autoComplete="off"
                        type="text"
                        placeholder="School Name"
                        name="school_name"
                        {...register("school_name")}
                        required
                      />
                    </FormControl>
                  </FormGroup>
                  <Button
                    variant="contained"
                    classes={{ root: classes.buttonRoot }}
                    type="submit"
                  >
                    Create School
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardContent>
                <Box
                  component={Typography}
                  variant="h4"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  School List
                </Box>
                <TableContainer>
                  <Box
                    component={Table}
                    alignItems="center"
                    marginBottom="0!important"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          classes={{
                            root:
                              classes.tableCellRoot +
                              " " +
                              classes.tableCellRootHead,
                          }}
                        >
                          SL
                        </TableCell>
                        <TableCell
                          classes={{
                            root:
                              classes.tableCellRoot +
                              " " +
                              classes.tableCellRootHead,
                          }}
                        >
                          School Name
                        </TableCell>
                        <TableCell
                          classes={{
                            root:
                              classes.tableCellRoot +
                              " " +
                              classes.tableCellRootHead,
                          }}
                        >
                          Student Count
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schools.map((list, index) => (
                        <TableList list={list} key={list.id} index={index} />
                      ))}
                    </TableBody>
                  </Box>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Institute;

const dataTable = [
  {
    name: "Tiger Nixon",
    position: "System Architect",
    office: "Edinburgh",
    age: "61",
    start_date: "2011/04/25",
    salary: "$320,800",
  },
  {
    name: "Garrett Winters",
    position: "Accountant",
    office: "Tokyo",
    age: "63",
    start_date: "2011/07/25",
    salary: "$170,750",
  },
];
