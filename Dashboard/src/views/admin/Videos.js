import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
import MoreVert from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/tables.js";

import axios from 'axios';
const useStyles = makeStyles(componentStyles);

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
  const theme = useTheme();
  const history = useHistory();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [anchorEl5, setAnchorEl5] = React.useState(null);
  const [anchorEl6, setAnchorEl6] = React.useState(null);
  const [anchorEl7, setAnchorEl7] = React.useState(null);
  const [anchorEl8, setAnchorEl8] = React.useState(null);
  const [anchorEl9, setAnchorEl9] = React.useState(null);
  const [anchorEl10, setAnchorEl10] = React.useState(null);
  const handleClick = (event) => {
    switch (event.currentTarget.getAttribute("aria-controls")) {
      case "simple-menu-1":
        setAnchorEl1(event.currentTarget);
        break;
      case "simple-menu-2":
        setAnchorEl2(event.currentTarget);
        break;
      case "simple-menu-3":
        setAnchorEl3(event.currentTarget);
        break;
      case "simple-menu-4":
        setAnchorEl4(event.currentTarget);
        break;
      case "simple-menu-5":
        setAnchorEl5(event.currentTarget);
        break;
      case "simple-menu-6":
        setAnchorEl6(event.currentTarget);
        break;
      case "simple-menu-7":
        setAnchorEl7(event.currentTarget);
        break;
      case "simple-menu-8":
        setAnchorEl8(event.currentTarget);
        break;
      case "simple-menu-9":
        setAnchorEl9(event.currentTarget);
        break;
      case "simple-menu-10":
        setAnchorEl10(event.currentTarget);
        break;
      default:
    }
  };
  const handleClose = () => {
    setAnchorEl1(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
    setAnchorEl4(null);
    setAnchorEl5(null);
    setAnchorEl6(null);
    setAnchorEl7(null);
    setAnchorEl8(null);
    setAnchorEl9(null);
    setAnchorEl10(null);
  };
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
                    Videos
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
                    Project
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Budget
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Users
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Completion
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                        videoDetails.map((list, index) => (
                <TableRow>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot +
                        " " +
                        classes.tableCellRootBodyHead,
                    }}
                    component="th"
                    variant="head"
                    scope="row"
                  >
                    {list.title}
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    {list.description}
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                      <Box
                        marginRight="10px"
                        component="i"
                        width=".375rem"
                        height=".375rem"
                        borderRadius="50%"
                        display="inline-block"
                        className={
                          classes.verticalAlignMiddle + " " + classes.bgWarning
                        }
                      ></Box>
                      pending
                    </Box>
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
                    <Box display="flex" alignItems="center">
                      <Box component="span" marginRight=".5rem">
                        60%
                      </Box>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={60}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes.bgGradientError,
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot }}
                    align="right"
                  >
                    <Box
                      aria-controls="simple-menu-1"
                      aria-haspopup="true"
                      onClick={handleClick}
                      size="small"
                      component={Button}
                      width="2rem!important"
                      height="2rem!important"
                      minWidth="2rem!important"
                      minHeight="2rem!important"
                    >
                      <Box
                        component={MoreVert}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        position="relative"
                        top="2px"
                        color={theme.palette.gray[500]}
                      />
                    </Box>
                    <Menu
                      id="simple-menu-1"
                      anchorEl={anchorEl1}
                      keepMounted
                      open={Boolean(anchorEl1)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Action</MenuItem>
                      <MenuItem onClick={handleClose}>Another action</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Something else here
                      </MenuItem>
                    </Menu>
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

export default Videos;
