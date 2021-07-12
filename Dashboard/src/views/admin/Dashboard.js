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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Avatar from "@material-ui/core/Avatar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Tooltip from "@material-ui/core/Tooltip";
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/dashboard.js";

import configData from "../../configData.json";
//Api Services
import ApiService from "../../services/api.service";
import AuthService from "../../services/auth.service";
import swal from "sweetalert";
const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const [discussionDetails, setdiscussionDetails] = useState([]);

  useEffect(() => {
    ApiService.getDiscussionDetails()
      .then((res) => setdiscussionDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onClickDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to change instructor status!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willChange) => {
      if (willChange) {
        ApiService.deleteDiscussion(id)
          .then(function (res) {
            swal("Success!", "Discussion Deleted Successfully!", "success");
            window.location.reload();
          })
          .catch(function (res) {
            swal("Failed!", "Please Try Again!", "error");
          });
      }
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        marginBottom="6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container component={Box} marginTop="3rem">
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot,
              }}
            >
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
                        Discussion
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                        display={
                          AuthService.isAdmin() == false ||
                          AuthService.isAdmin() == null
                            ? ""
                            : "none"
                        }
                      >
                        <Link to="/admin/creatediscussion">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
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
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        SL
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Title
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Created By
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Comments
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Details
                      </TableCell>
                      {AuthService.isAdmin() == false ||
                      AuthService.isAdmin() == null ? (
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
                          Action
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {discussionDetails.map((list, index) => (
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
                          {(index = index + 1)}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {list.title}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {list.description.substring(0, 50)} ....
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {list.created_date}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Tooltip title={list.created_by.name} placement="top">
                            <Avatar
                              classes={{ root: classes.avatarRoot }}
                              alt="..."
                              src={
                                list.created_by.photo ==
                                configData.SERVER_URL + "media/"
                                  ? require("assets/img/theme/defaultImage.png")
                                      .default
                                  : list.created_by.photo
                              }
                            />
                          </Tooltip>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {list.comments.length}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Link
                            to={"/admin/discussion/details/" + list.id}
                            style={{ color: "gray" }}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              <Box
                                component={VisibilityIcon}
                                position="relative"
                                top="2px"
                              />{" "}
                              View
                            </Button>
                          </Link>
                        </TableCell>
                        {AuthService.isAdmin() == false ||
                        AuthService.isAdmin() == null ? (
                          ""
                        ) : (
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            <Button
                              onClick={() => onClickDelete(list.id)}
                              variant="contained"
                              size="small"
                              style={{
                                backgroundColor: "red",
                                borderColor: "red",
                              }}
                            >
                              <Box
                                component={DeleteOutlineIcon}
                                position="relative"
                                top="2px"
                              />{" "}
                              Delete
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Box>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
