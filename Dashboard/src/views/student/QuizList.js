import React, { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";

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
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";
import VisibilityIcon from "@material-ui/icons/Visibility";

import configData from "../../configData.json";

//Api Services
import ApiService from "../../services/api.service";
import AuthService from "services/auth.service";
import AttemptQuiz from "./AttemptQuiz";

const useStyles = makeStyles(componentStyles);

const handleClick = (questions, title) => {
  {
    /* <AttemptQuiz questions={questions} title={title} /> */
  }
};

const TableList = ({ list, index, score }) => {
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
        <Box style={{}}>{list.title}</Box>
        <Box>{list.description}</Box>
      </TableCell>
      {AuthService.isStudent() == false || AuthService.isStudent() == null ? (
        ""
      ) : (
        <TableCell classes={{ root: classes.tableCellRoot }}>

          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleClick(list.questions, list.title)}
            disabled={score[0] ? true : false}
          >
            <Link
              to={{
                pathname: "/admin/attempt_quiz",
                quiz: list,
                questions: list.questions,
              }}
              style={{ textDecoration: "none", color: score[0] ? "black" : "white" }}
            >
              <Box component={VisibilityIcon} position="relative" top="2px" />{" "}
              Attempt Quiz
            </Link>
          </Button>

        </TableCell>
      )}
      {AuthService.isStudent() == false || AuthService.isStudent() == null ? (
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Link
            to={{
              pathname: "/admin/view_score",
              state: list.id
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="primary"
            >
              <Box component={VisibilityIcon} position="relative" top="2px" />{" "}
              Quiz results
            </Button>
          </Link>
        </TableCell>
      ) : (
        <TableCell classes={{ root: classes.tableCellRoot }}>
          {score[0]?.score}/{score[0]?.totalMarks}
        </TableCell>
      )}
    </TableRow>
  );
};

const QuizList = () => {
  const classes = useStyles();
  const [quizDetails, setQuizDetails] = useState([]);
  const [studentScore, setStudentScore] = useState([])

  useEffect(() => {
    ApiService.getQuizDetails()
      .then((res) => setQuizDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    ApiService.getUserDetails(AuthService.getUserId())
      .then(({ data }) => setStudentScore(data.studentScore))
      .catch(err => console.log(err))
  }, [])

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
                    Quiz Description
                  </TableCell>
                  {/* <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Upload Date
                  </TableCell> */}
                  {AuthService.isStudent() == false ||
                    AuthService.isStudent() == null ? (
                    ""
                  ) : (
                    <TableCell
                      classes={{
                        root:
                          classes.tableCellRoot +
                          " " +
                          classes.tableCellRootHead,
                      }}
                    >
                      Attempts
                    </TableCell>
                  )}
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
                {quizDetails.map((list, index) => (
                  <TableList list={list} key={list.id} index={index}
                    score={
                      studentScore?.filter(
                        score => score.quiz === list.id
                      )
                    }
                  />
                ))}
              </TableBody>
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default QuizList;
