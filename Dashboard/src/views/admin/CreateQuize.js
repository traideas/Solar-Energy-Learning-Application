import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Header from "components/Headers/Header";
import componentStyles from "assets/theme/views/admin/elements";

//meterial UI Components
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Box,
  Container,
  CardHeader,
  CardContent,
  Grid,
  FormGroup,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import axios from "axios";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles(componentStyles);

const CreateQuize = () => {
  //form schema builder
  const validationSchema = Yup.object().shape({
    numberOfQuize: Yup.string().required("Number of Quize is required"),
    quizes: Yup.array().of(
      Yup.object().shape({
        question: Yup.string(),
        a: Yup.string(),
        b: Yup.string(),
        c: Yup.string(),
        d: Yup.string(),
        correct_option: Yup.string(),
      })
    ),
  });
  const classes = useStyles();
  const { register, handleSubmit, reset, errors, watch } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //For Watching re-render when the Quize number is changed
  const watchNumberOfQuize = watch("numberOfQuize");

  //Return Array of Quize number index for rendering dynamic forms in the page
  const quizeNumber = () => {
    return [...Array(parseInt(watchNumberOfQuize || 0)).keys()];
  };

  const onSubmit = ({ title, description, quizes }) => {
    axios
      .post("http://127.0.0.1:8000/quiz/", {
        title: title,
        description: description,
        teacher: AuthService.getUserId(),
        photo: null,
        total_marks: Math.floor(Math.random() * 101),
      })
      .then(({ data }) => {
        quizes.map(({ question, a, b, c, d, correct_option }) => {
          axios.post("http://127.0.0.1:8000/question/", {
            quiz: data.id,
            question: question,
            options_1: a,
            options_2: b,
            options_3: c,
            options_4: d,
            answer: correct_option,
            mark: Math.floor(Math.random() * 101),
          }).then(res => console.log(res)).then(err => console.log(err));
        });
      })
      .then((err) => console.log(err));
  };

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
            title="Quize Create"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormLabel>Quize Title</FormLabel>
                    <FormControl>
                      <OutlinedInput
                        fullWidth
                        type="text"
                        className={classes.inputLarge}
                        placeholder="Quize Question"
                        name="title"
                        {...register("title")}
                        required
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                {/* <Grid item xs={6}>
                  <FormGroup>
                    <FormLabel>Upload Quize Thumbnail</FormLabel>
                    <FormControl>
                      <OutlinedInput
                        fullWidth
                        type="text"
                        className={classes.inputLarge}
                        placeholder="Quize Thumbnail"
                        name="Photo"
                        {...register("Photo")}
                        required
                      />
                    </FormControl>
                  </FormGroup>
                </Grid> */}
                <Grid item xs={12}>
                  <FormGroup>
                    <FormLabel>Quiz Description</FormLabel>
                    <FormControl>
                      <OutlinedInput
                        fullWidth
                        type="text"
                        className={classes.inputLarge}
                        placeholder="Quize Description"
                        name="description"
                        {...register("description")}
                        required
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormGroup>
                    <FormLabel>Select The Number of Quizes</FormLabel>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        defaultValue={""}
                        IconComponent={KeyboardArrowDown}
                        name="numberOfQuize"
                        {...register("numberOfQuize")}
                      >
                        {["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <MenuItem key={i} value={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              {quizeNumber().map((i) => (
                <Grid container key={i}>
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormLabel>Quize {i + 1}</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].question`}
                          {...register(`quizes[${i}].question`)}
                          required
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormLabel>Option A</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].a`}
                          {...register(`quizes[${i}].a`)}
                          required
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormLabel>Option B</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].b`}
                          {...register(`quizes[${i}].b`)}
                          required
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormLabel>Option C</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].c`}
                          {...register(`quizes[${i}].c`)}
                          required
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormLabel>Option D</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].d`}
                          {...register(`quizes[${i}].d`)}
                          required
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormLabel>Correct Option</FormLabel>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          defaultValue={""}
                          IconComponent={KeyboardArrowDown}
                          name={`quizes[${i}].correct_option`}
                          {...register(`quizes[${i}].correct_option`)}
                          required
                        >
                          <MenuItem value="1">A</MenuItem>
                          <MenuItem value="2">B</MenuItem>
                          <MenuItem value="3">C</MenuItem>
                          <MenuItem value="4">D</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="contained"
                classes={{ root: classes.buttonRoot }}
                type="submit"
              >
                Create Quize
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CreateQuize;
