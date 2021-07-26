import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import Avatar from "@material-ui/core/Avatar";
import Create from "@material-ui/icons/Create";
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";
import Button from "@material-ui/core/Button";

import swal from "sweetalert";
//Api Services
import ApiService from "../../services/api.service";

const useStyles = makeStyles(componentStyles);
const onClickStatus = (
  id,
  first_name,
  last_name,
  username,
  email,
  is_verified,
  institute_name
) => {
  swal({
    title: "Are you sure?",
    text: "You want to change instructor status!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willChange) => {
    if (willChange) {
      ApiService.changeInstructorStatus(
        id,
        first_name,
        last_name,
        username,
        email,
        is_verified,
        institute_name
      )
        .then(function (res) {
          swal(
            "Success!",
            "Instructor Status Changed Successfully!",
            "success"
          );
          window.location.reload();
        })
        .catch(function (res) {
          swal("Failed!", "Please Try Again!", "error");
        });
    }
  });
};
const TableList = ({ list, index, schoolList }) => {
  const classes = useStyles();
  return (
    <TableRow hover key={list.id}>
      <TableCell
        classes={{
          root: classes.tableCellRoot + " " + classes.tableCellRootBodyHead,
        }}
        variant="head"
      >
        {(index = index + 1)}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {list.created_by.first_name} {list.created_by.last_name}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {list.created_by.email}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        {schoolList[0].school_name}
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <Avatar
          classes={{ root: classes.avatarRoot }}
          alt="..."
          src={
            list.created_by.photo == null
              ? require("assets/img/theme/defaultImage.png").default
              : list.created_by.photo
          }
        />
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <Box paddingTop=".35rem" paddingBottom=".35rem">
          <Box
            marginRight="10px"
            component="i"
            width=".5rem"
            height=".5rem"
            borderRadius="50%"
            display="inline-block"
            className={
              classes.verticalAlignMiddle +
              " " +
              (list.is_verified == true ? classes.bgSuccess : classes.bgWarning)
            }
          ></Box>
          {list.is_verified == true ? "Verified" : "Unverified"}
        </Box>
      </TableCell>

      <TableCell classes={{ root: classes.tableCellRoot }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() =>
            onClickStatus(
              list.created_by.id,
              list.created_by.first_name,
              list.created_by.last_name,
              list.created_by.username,
              list.created_by.email,
              list.is_verified == true ? 0 : 1,
              list.institute_name,
              list.created_by.photo
            )
          }
        >
          <Box component={Create} position="relative" top="2px" /> Status
        </Button>
      </TableCell>
    </TableRow>
  );
};

const InstructorList = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);

  useEffect(() => {
    ApiService.getSchoolList()
      .then((res) => setSchoolList(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    ApiService.getTeacherList()
      .then((res) => setTeacherList(res.data))
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
        marginTop="-3rem"
        marginBottom="6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
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
                    Name
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Institute
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Photo
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    + Status
                  </TableCell>

                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherList.map((list, index) => (
                  <TableList
                    list={list}
                    key={list.id}
                    index={index}
                    schoolList={schoolList.filter(
                      (school) => school.id === list.institute_name
                    )}
                  />
                ))}
              </TableBody>
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default InstructorList;
