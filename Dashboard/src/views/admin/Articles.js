import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
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
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/lab components
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Pagination from "@material-ui/lab/Pagination";
// @material-ui/icons components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/tables.js";

import axios from 'axios';
const useStyles = makeStyles(componentStyles);

const Slides = () => {


  const [slideDetails, setslideDetails] = useState([])

  useEffect(() => {
    let mounted = true
    axios.get("http://127.0.0.1:8000/document/")
      .then(res => {
        if (mounted) {
          setslideDetails(res.data)
        }
      })
    return () => {
      mounted = false
    }
  }, [setslideDetails])
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
                    <Link to='/admin/articles/createarticles'>
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
                    File
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  slideDetails.map((list, index) => (
                    <TableRow key={list.id}>
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
                        <AvatarGroup>
                          <Tooltip title="Ryan Tompson" placement="top">
                            <Avatar
                              classes={{ root: classes.avatarRoot }}
                              alt="..."
                              src={
                                require("assets/img/theme/team-1-800x800.jpg")
                                  .default
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Romina Hadid" placement="top">
                            <Avatar
                              classes={{ root: classes.avatarRoot }}
                              alt="..."
                              src={
                                require("assets/img/theme/team-2-800x800.jpg")
                                  .default
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Alexander Smith" placement="top">
                            <Avatar
                              classes={{ root: classes.avatarRoot }}
                              alt="..."
                              src={
                                require("assets/img/theme/team-3-800x800.jpg")
                                  .default
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Jessica Doe" placement="top">
                            <Avatar
                              classes={{ root: classes.avatarRoot }}
                              alt="..."
                              src={
                                require("assets/img/theme/team-4-800x800.jpg")
                                  .default
                              }
                            />
                          </Tooltip>
                        </AvatarGroup>
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        <a href={list.file} target="_blank"><img src={list.photo} style={{ height: "100px" }} /></a>
                      </TableCell>

                    </TableRow>
                  ))
                }

              </TableBody>
            </Box>
          </TableContainer>
          <Box
            classes={{ root: classes.cardActionsRoot }}
            component={CardActions}
            justifyContent="flex-end"
          >
            <Pagination count={3} color="primary" variant="outlined" />
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Slides;
