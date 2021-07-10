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
  console.log(location.quiz);
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
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h3"
                  component="h3"
                  className={classes.mb0}
                >
                  Argon Dashboard PRO Material-UI
                </Typography>
                <RadioGroup
                  aria-label="gender"
                  name="example-radio"
                  defaultValue="2"
                  className={classes.mb0}
                >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Unchecked"
                    value="1"
                    labelPlacement="end"
                    classes={{
                      root: classes.formControlCheckboxLabelRoot,
                      label: classes.formControlCheckboxLabelLabel,
                    }}
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Checked"
                    labelPlacement="end"
                    value="2"
                    classes={{
                      root: classes.formControlCheckboxLabelRoot,
                      label: classes.formControlCheckboxLabelLabel,
                    }}
                  />
                  <FormControlLabel
                    control={<Radio color="primary" disabled />}
                    label="Unchecked"
                    value="1"
                    labelPlacement="end"
                    classes={{
                      root: classes.formControlCheckboxLabelRoot,
                      label: classes.formControlCheckboxLabelLabel,
                    }}
                  />
                  <FormControlLabel
                    control={<Radio color="primary" disabled />}
                    label="Checked"
                    labelPlacement="end"
                    value="2"
                    classes={{
                      root: classes.formControlCheckboxLabelRoot,
                      label: classes.formControlCheckboxLabelLabel,
                    }}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default AttemptQuiz;
