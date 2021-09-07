import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
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
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";

//Api Services
import ApiService from "../../services/api.service";
import swal from "sweetalert";

const useStyles = makeStyles(componentStyles);

const TableList = ({ list, index }) => {
  console.log(list);
  const [userName, setUserName] = useState("");
  const [studentScoreId, setStudentScoreId] = useState();
  const classes = useStyles();
  useEffect(() => {
    ApiService.getUserStudentDetailsOnly(list.student)
      .then(
        ({
          data: {
            created_by: { first_name, last_name },
            studentScore,
          },
        }) => {
          setUserName(`${first_name} ${last_name}`);
          setStudentScoreId(studentScore[0]?.id);
        }
      )
      .catch((err) => console.log(err));
  }, []);
  const onClickReset = (studentScoreId) => {
    swal({
      title: "Are you sure?",
      text: "You want to reset the student score",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willChange) => {
      if (willChange) {
        ApiService.resetScore(studentScoreId)
          .then(function (res) {
            swal("Success!", "Student score was reseted!", "success");
            window.location.reload();
          })
          .catch(function (res) {
            swal("Failed!", "Please Try Again!", "error");
          });
      }
    });
  };
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
        {userName}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {list.score}/{list.totalMarks}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <Button
          onClick={() => onClickReset(studentScoreId)}
          variant="contained"
          size="small"
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          <Box component={DeleteOutlineIcon} position="relative" top="2px" />{" "}
          Reset
        </Button>
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
                    Quiz Score
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
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Reset
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
