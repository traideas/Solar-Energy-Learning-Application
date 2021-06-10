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
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Create from "@material-ui/icons/Create";
// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Icon from '@material-ui/core/Icon';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVert from "@material-ui/icons/MoreVert";
import { useTheme } from "@material-ui/core/styles";
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
                {list.user.first_name} {list.user.last_name}
            </TableCell>
            <TableCell classes={{ root: classes.tableCellRoot }} >
                {list.user.email}
            </TableCell>
            <TableCell classes={{ root: classes.tableCellRoot }}>
                {list.institute_name}
            </TableCell>
            <TableCell classes={{ root: classes.tableCellRoot }}>
                <Avatar
                    classes={{ root: classes.avatarRoot }}
                    alt="..."
                    src={(list.user.photo == null) ? require("assets/img/theme/defaultImage.png").default : list.user.photo}
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
                            classes.verticalAlignMiddle + " " + (list.is_verified == true ? classes.bgSuccess : classes.bgWarning)
                        }
                    ></Box>
                    {(list.is_verified == true) ? "Verified" : "Unverified"}
                </Box>
            </TableCell>

            <TableCell classes={{ root: classes.tableCellRoot }}>

                <Button variant="contained" size="small" color="primary">
                    <Box component={Create} position="relative" top="2px" />{" "}
                     Status
                </Button>

            </TableCell>


        </TableRow>
    )
}

const InstructorList = () => {

    const [teacherList, setTeacherList] = useState([])

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
                marginTop="-6rem"
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
                                        Status
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
                                {
                                    teacherList.map((list, index) => (
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

export default InstructorList;