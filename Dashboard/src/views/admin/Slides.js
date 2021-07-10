import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

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
import VisibilityIcon from '@material-ui/icons/Visibility';
import configData from '../../configData.json'
import componentStyles from "assets/theme/views/admin/tables.js";

//Api Services
import ApiService from "../../services/api.service";

const useStyles = makeStyles(componentStyles);

const TableList = ({ list, index }) => {
  const classes = useStyles()
  return (

    <TableRow hover key={list.id}>
      <TableCell
        classes={{
          root:
            classes.tableCellRoot +
            " " +
            classes.tableCellRootBodyHead,
        }}
        variant="head"

      >
        {index = index + 1}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }} >
        {list.title}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }} >
        {list.description}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {list.upload_date}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <Tooltip title={list.created_by.name} placement="top">
          <Avatar
            classes={{ root: classes.avatarRoot }}
            alt="..."
            src={(list.created_by.photo == configData.SERVER_URL + "media/") ? require("assets/img/theme/defaultImage.png").default : list.created_by.photo}
          />
        </Tooltip>
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <img src={list.photo} style={{ height: "80px" }} />
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <a href={list.file} target="_blank">
          <Button variant="contained" size="small" color="primary">
            <Box component={VisibilityIcon} position="relative" top="2px" />{" "}
            View
          </Button>
        </a>
      </TableCell>

    </TableRow>
  )
}

const Slides = () => {


  const [slideDetails, setslideDetails] = useState([])

  useEffect(() => {
    ApiService.getSlideDetails()
      .then((res) => setslideDetails(res.data))
      .catch((err) => console.log(err));
  }, []);
  const classes = useStyles();

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

                  </Box>
                </Grid>
                <Grid item xs="auto">
                  <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                    <Link to='/admin/slides/createslides'>
                      <Button variant="contained" color="primary" size="small"
                      >
                        Create New
                      </Button>
                    </Link>
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
                    Title
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Upload Date
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Created By
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Thumbnil
                  </TableCell>

                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    File
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  slideDetails.map((list, index) => (
                    <TableList list={list} key={list.id} index={index} />
                  ))
                }

              </TableBody>
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default Slides;
