import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import DirectionsRun from "@material-ui/icons/DirectionsRun";
/* import EventNote from "@material-ui/icons/EventNote";
import LiveHelp from "@material-ui/icons/LiveHelp"; */
import Person from "@material-ui/icons/Person";

// core components
import componentStyles from "assets/theme/components/navbar-dropdown.js";

//Api Services
import ApiService from "../../services/api.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

const useStyles = makeStyles(componentStyles);

export default function NavbarDropdown() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (AuthService.isAdmin()) {
      ApiService.getUserDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((err) => console.log(err));
    } else if (AuthService.isTeacher()) {
      ApiService.getUserTeacherDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setUserDetails(res.data.created_by);
        })
        .catch((err) => console.log(err));
    } else {
      ApiService.getUserStudentDetailsOnly(AuthService.getUserId())
        .then((res) => {
          setUserDetails(res.data.created_by);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography
        variant="h6"
        component="h6"
        classes={{ root: classes.menuTitle }}
      >
        Welcome!
      </Typography>
      <Box
        display="flex!important"
        alignItems="center!important"
        component={MenuItem}
        onClick={handleMenuClose}
      >
        <Box
          component={Person}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight="1rem"
        />
        <Link style={{ textDecoration: "none" }} to="/admin/user-profile">
          <span>My Profile</span>
        </Link>
      </Box>
      <Divider component="div" classes={{ root: classes.dividerRoot }} />
      <Box
        display="flex!important"
        alignItems="center!important"
        component={MenuItem}
        onClick={handleLogout}
      >
        <Box
          component={DirectionsRun}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight="1rem"
        />
        <span>Logout</span>
      </Box>
    </Menu>
  );

  return (
    <>
      <Button
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        classes={{
          label: classes.buttonLabel,
          root: classes.buttonRoot,
        }}
      >
        <Avatar
          alt="..."
          src={
            userDetails.photo == null
              ? require("assets/img/theme/defaultImage.png").default
              : userDetails.photo
          }
          classes={{
            root: classes.avatarRoot,
          }}
        />
        <Hidden smDown>
          {userDetails.first_name} {userDetails.last_name}
        </Hidden>
      </Button>
      {renderMenu}
    </>
  );
}
