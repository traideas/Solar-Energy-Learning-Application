import React from "react";
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
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";

const useStyles = makeStyles(componentStyles);

const CreateQuize = () => {
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
            title="Quize Create"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FormLabel>Select The Number of Quizes</FormLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select defaultValue={1} IconComponent={KeyboardArrowDown}>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <FormGroup>
                  <FormLabel>Quize 1</FormLabel>
                  <FormControl>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      className={classes.inputLarge}
                      placeholder="Quize Question"
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormLabel>Quize 1</FormLabel>
                  <FormControl>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      className={classes.inputLarge}
                      placeholder="Quize Question"
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormLabel>Quize 1</FormLabel>
                  <FormControl>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      className={classes.inputLarge}
                      placeholder="Quize Question"
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormLabel>Quize 1</FormLabel>
                  <FormControl>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      className={classes.inputLarge}
                      placeholder="Quize Question"
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormLabel>Quize 1</FormLabel>
                  <FormControl>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      className={classes.inputLarge}
                      placeholder="Quize Question"
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CreateQuize;
