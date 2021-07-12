import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// @material-ui/lab components

// @material-ui/icons components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";

//Api Services
import ApiService from "../../services/api.service";
import AuthService from "services/auth.service";
import swal from "sweetalert";

const useStyles = makeStyles(componentStyles);

const onClickDelete = (id) => {
  swal({
    title: "Are you sure?",
    text: "You want to change instructor status!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willChange) => {
    if (willChange) {
      ApiService.deleteQuiz(id)
        .then(function (res) {
          swal("Success!", "Quiz Deleted Successfully!", "success");
          window.location.reload();
        })
        .catch(function (res) {
          swal("Failed!", "Please Try Again!", "error");
        });
    }
  });
};

const TableList = ({ list, index }) => {
  console.log(list);
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
        {list.student}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {list.score}/{list.totalMarks}
      </TableCell>
    </TableRow>
  );
};

const ViewQuizScore = ({ location }) => {
  const classes = useStyles();
  console.log(location.state);
  const [quiz, setQuiz] = useState();
  useEffect(() => {
    ApiService.getQuizScoreById(location.state)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
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
                    Quiz List
                  </Box>
                </Grid>
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
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
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    SL
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Student Name
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quiz?.map((list, index) => (
                  <TableList list={list} key={list.id} index={index} />
                ))}
              </TableBody>
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default ViewQuizScore;
