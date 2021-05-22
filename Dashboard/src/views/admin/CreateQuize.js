import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
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

const useStyles = makeStyles(componentStyles);

const CreateQuize = () => {
  //form schema builder
  const validationSchema = Yup.object().shape({
    numberOfQuize: Yup.string().required("Number of Quize is required"),
    quizes: Yup.array().of(
      Yup.object().shape({
        question: Yup.string(),
        //optionA: Yup.string().required("Quize option is required"),
        //optionB: Yup.string().required("Quize option is required"),
        //optionC: Yup.string().required("Quize option is required"),
        //optionD: Yup.string().required("Quize option is required")
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

  const onSubmit = (data) => {
    console.log("clasd")
    console.log(data)
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
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
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={3}>
                    <FormGroup>
                      <FormLabel>Option A</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].optionA`}
                          {...register(`quizes[${i}].optionA`)}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={3}>
                    <FormGroup>
                      <FormLabel>Option B</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].optionB`}
                          {...register(`quizes[${i}].optionB`)}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={3}>
                    <FormGroup>
                      <FormLabel>Option C</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].optionC`}
                          {...register(`quizes[${i}].optionC`)}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={3}>
                    <FormGroup>
                      <FormLabel>Option D</FormLabel>
                      <FormControl>
                        <OutlinedInput
                          fullWidth
                          type="text"
                          className={classes.inputLarge}
                          placeholder="Quize Question"
                          name={`quizes[${i}].optionD`}
                          {...register(`quizes[${i}].optionD`)}
                        />
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