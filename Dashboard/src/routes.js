// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
import Videos from "views/admin/Videos.js";
import CreateVideos from "views/admin/CreateVideos";
import Slides from "views/admin/Slides";
import Articles from "views/admin/Articles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FlashOn from "@material-ui/icons/FlashOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import Person from "@material-ui/icons/Person";
import VpnKey from "@material-ui/icons/VpnKey";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CreateSlides from "views/admin/CreateSlides";
import CreateArticles from "views/admin/CreateArticles";
import ViewQuize from "views/admin/ViewQuize";
import CreateQuize from "views/admin/CreateQuize";

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
    invisible: true
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
    invisible: true
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
    path: "/videos/createvideos",
    name: "Create Video",
    iconColor: "Primary",
    component: CreateVideos,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/slides",
    name: "Slides",
    icon: NoteAddIcon,
    iconColor: "Success",
    component: Slides,
    layout: "/admin",
  },
  {
    path: "/slides/createslides",
    name: "Create Slide",
    component: CreateSlides,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/articles",
    name: "Articles",
    icon: AttachFileIcon,
    iconColor: "Error",
    component: Articles,
    layout: "/admin",
  },
  {
    path: "/articles/createarticles",
    name: "Slide",
    component: CreateArticles,
    layout: "/admin",
    invisible: true
  },
  {
    divider: true,
  },
  {
    title: "Quize",
  },
  {
    path: "/quize",
    name: "View Quize",
    component: ViewQuize,
    layout: "/admin"
  },
  {
    path: "/createquize",
    name: "Create Quize",
    component: CreateQuize,
    layout: "/admin"
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
