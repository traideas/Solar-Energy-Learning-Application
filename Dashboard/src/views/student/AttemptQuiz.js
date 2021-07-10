import React, { useState, useEffect } from "react";
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
import Avatar from "@material-ui/core/Avatar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/dashboard.js";

import configData from "../../configData.json";
//Api Services
import ApiService from "../../services/api.service";
import { CardContent } from "@material-ui/core";

const useStyles = makeStyles(componentStyles);

function AttemptQuiz({ location }) {
  const { id, title, description, total_marks } = location.quiz;
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={`Quize Title: ${location.quiz.title}`}
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h1",
            }}
          ></CardHeader>
          <CardContent>
            <Grid container>
              {location.questions.map(({question, options_1,options_2,options_3,options_4, answer}) => (
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
                    name="example-radio"
                    defaultValue=""
                    className={classes.mb0}
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
                  <hr />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default AttemptQuiz;
