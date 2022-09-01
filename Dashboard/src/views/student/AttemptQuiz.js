import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/dashboard.js";

//Api Services
import ApiService from "../../services/api.service";
import AuthService from "../../services/auth.service";
import { CardContent } from "@material-ui/core";
import swal from "sweetalert";
const useStyles = makeStyles(componentStyles);

function AttemptQuiz({ location }) {
  const { id, title } = location.quiz;
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [questions, setQuestions] = useState([]);
  const [ansHide, setansHide] = useState(false);
  const [userAns, setUserAns] = useState([]);
  useEffect(() => {
    ApiService.getQuizById(id)
      .then((res) => setQuestions(res.data.questions))
      .catch((err) => console.log(err));
  }, []);
  const onSubmit = ({ userAnswer }) => {
    console.log(parseInt(userAnswer));
    setUserAns(userAnswer);
    const totalQuestion = userAnswer.length;
    const totalMarks = userAnswer.length;
    let right = 0;
    userAnswer.map((answer, i) => {
      //console.log(questions[i].answer);
      if (answer == questions[i].answer) {
        right = right + 1;
      }
    });
    const wrong = totalMarks - right;
    const score = right;
    ApiService.setQuizScore(
      AuthService.getUserId(),
      id,
      totalQuestion,
      totalMarks,
      right,
      wrong,
      score
    )
      .then((res) => {
        swal("Great!", "Your Score is " + right, "success");
        setansHide(true);
      })
      .catch((err) =>
        swal("Sorry!", "You already attempted this quiz!", "warning")
      );
  };
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-3rem"
        marginBottom="6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={`Quize Title: ${title}`}
            subheader={`Total Marks: ${questions.length}`}
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h1",
            }}
          ></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                {questions.map(
                  (
                    {
                      question,
                      options_1,
                      options_2,
                      options_3,
                      options_4,
                      answer,
                    },
                    index
                  ) => (
                    <Grid item xs={12}>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={classes.mb0}
                      >
                        Question: {question}
                      </Typography>

                      <RadioGroup
                        aria-label="gender"
                        defaultValue=""
                        className={classes.mb0}
                        name={`userAnswer[${index}]`}
                        {...register(`userAnswer[${index}]`)}
                        required
                      >
                        <FormControlLabel
                          control={<Radio color="primary" />}
                          label={options_1}
                          value="1"
                          labelPlacement="end"
                          classes={{
                            root: classes.formControlCheckboxLabelRoot,
                            label: classes.formControlCheckboxLabelLabel,
                          }}
                        />
                        <FormControlLabel
                          control={<Radio color="primary" />}
                          label={options_2}
                          labelPlacement="end"
                          value="2"
                          classes={{
                            root: classes.formControlCheckboxLabelRoot,
                            label: classes.formControlCheckboxLabelLabel,
                          }}
                        />
                        <FormControlLabel
                          control={<Radio color="primary" />}
                          label={options_3}
                          value="3"
                          labelPlacement="end"
                          classes={{
                            root: classes.formControlCheckboxLabelRoot,
                            label: classes.formControlCheckboxLabelLabel,
                          }}
                        />
                        <FormControlLabel
                          control={<Radio color="primary" />}
                          label={options_4}
                          labelPlacement="end"
                          value="4"
                          classes={{
                            root: classes.formControlCheckboxLabelRoot,
                            label: classes.formControlCheckboxLabelLabel,
                          }}
                        />
                      </RadioGroup>
                      {userAns[index] != answer ? (
                        <Box display={ansHide == true ? "" : "none"}>
                          {console.log(userAns[index], answer)}
                          <p
                            style={{
                              padding: "10px",
                              backgroundColor: "orange",
                              fontWeight: "700",
                              color: "black",
                            }}
                          >
                            Correct Answer:{" "}
                            {answer === 1
                              ? options_1
                              : answer === 2
                              ? options_2
                              : answer === 3
                              ? options_3
                              : options_4}
                          </p>
                        </Box>
                      ) : (
                        ""
                      )}
                      <hr />
                      <br />
                    </Grid>
                  )
                )}
                {ansHide ? (
                  <Button color="#48A14D !important" variant="contained" fullWidth>
                    <Link
                      to="/admin/quizlist"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Back to quiz page
                    </Link>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Submit Answers
                  </Button>
                )}
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default AttemptQuiz;
