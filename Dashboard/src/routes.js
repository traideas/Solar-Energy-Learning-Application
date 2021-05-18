// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
import Videos from "views/admin/Videos.js";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
/* import Dns from "@material-ui/icons/Dns"; */
import FlashOn from "@material-ui/icons/FlashOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import LocationOn from "@material-ui/icons/LocationOn";
/* import Palette from "@material-ui/icons/Palette"; */
import Person from "@material-ui/icons/Person";
/* import Tv from "@material-ui/icons/Tv"; */
import VpnKey from "@material-ui/icons/VpnKey";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AttachFileIcon from '@material-ui/icons/AttachFile';

var routes = [
  {
    href: "#pablo",
    name: "MyREL 0.01",
    icon: FlashOn,
    upgradeToPro: true,
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: DashboardIcon,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: Grain,
    iconColor: "Primary",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    iconColor: "Warning",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: Person,
    iconColor: "WarningLight",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: FormatListBulleted,
    iconColor: "Error",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: VpnKey,
    iconColor: "Info",
    component: Login,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/register",
    name: "Register",
    icon: AccountCircle,
    iconColor: "ErrorLight",
    component: Register,
    layout: "/auth",
    invisible: true
  },
  {
    divider: true,
  },
  {
    title: "Learning Metarials",
  },
  {
    path: "/videos",
    name: "Videos",
    icon: VideoLibraryIcon,
    iconColor: "Primary",
    component: Videos,
    layout: "/admin",
  },
  {
    path: "/create/videos",
    name: "Videos",
    icon: VideoLibraryIcon,
    iconColor: "Primary",
    component: Videos,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/register",
    name: "Slide",
    icon: NoteAddIcon,
    iconColor: "Success",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Article",
    icon: AttachFileIcon,
    iconColor: "Error",
    component: Register,
    layout: "/auth",
  },
  {
    divider: true,
  },
  {
    title: "Quize",
  },
  /* {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
    name: "Getting started",
    icon: FlashOn,
  },
  {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/colors/argon-dashboard?ref=admui-admin-sidebar",
    name: "Foundation",
    icon: Palette,
  },
  {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/alerts/argon-dashboard?ref=admui-admin-sidebar",
    name: "Components",
    icon: Dns,
  }, */
];
export default routes;
