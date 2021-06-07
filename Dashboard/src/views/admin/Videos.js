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
// @material-ui/lab components
import Pagination from "@material-ui/lab/Pagination";
// @material-ui/icons components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
const useStyles = makeStyles(componentStyles);

const TableList = ({ list, index }) => {
  const classes = useStyles()
  const [userDetails, setUserDetails] = useState({

    user: {
      first_name: "",
      last_name: "",
    }
  })
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/teacher/" + list.created_by + "/")
      .then(res => {
        setUserDetails(res.data)
      })
  }, [setUserDetails])
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
        {userDetails.user.first_name} {userDetails.user.last_name}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <img src={list.photo} style={{ height: "100px" }} />
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <a href={list.file} target="_blank" style={{ color: "gray" }}>
          <Icon component={VisibilityIcon} ></Icon>
        </a>
      </TableCell>

    </TableRow>
  )
}

const Videos = () => {

  const [videoDetails, setvideoDetails] = useState([])

  useEffect(() => {
    let mounted = true
    axios.get("http://127.0.0.1:8000/video/")
      .then(res => {
        if (mounted) {
          setvideoDetails(res.data)
        }
      })
    return () => {
      mounted = false
    }
  }, [setvideoDetails])
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
                    <Link to='/admin/videos/createvideos'>
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
                  videoDetails.map((list, index) => (
                    <TableList list={list} key={list.id} index={index} />
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

export default Videos;
