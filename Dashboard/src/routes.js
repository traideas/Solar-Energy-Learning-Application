// core components
import Dashboard from "views/admin/Dashboard.js";
import Login from "views/auth/Login.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
import Videos from "views/admin/Videos.js";
import CreateVideos from "views/admin/CreateVideos";
import Slides from "views/admin/Slides";
import Articles from "views/admin/Articles";
import CreateSlides from "views/admin/CreateSlides";
import CreateArticles from "views/admin/CreateArticles";
import ViewQuiz from "views/admin/ViewQuiz";
import CreateQuiz from "views/admin/CreateQuiz";
import CreateDiscussion from "views/admin/CreateDiscussion"
import DiscussionDetails from "views/admin/DiscussionDetails"
import InstructorList from "views/admin/InstructorList"

import AccountCircle from "@material-ui/icons/AccountCircle";
import FlashOn from "@material-ui/icons/FlashOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Person from "@material-ui/icons/Person";
import VpnKey from "@material-ui/icons/VpnKey";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RateReviewIcon from '@material-ui/icons/RateReview';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

var routes = [
  {
    href: "/",
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
    path: "/creatediscussion",
    name: "Create Discussion",
    component: CreateDiscussion,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/discussion/details/:id",
    name: "Discussion Details",
    component: DiscussionDetails,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: Person,
    iconColor: "Error",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Instructors",
    icon: RecentActorsIcon,
    iconColor: "light",
    component: InstructorList,
    layout: "/admin",
    adminOnly: true,

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
    title: "Quizs",
  },
  {
    path: "/quiz",
    name: "Quizs",
    icon: QuestionAnswerIcon,
    iconColor: "light",
    component: ViewQuiz,
    layout: "/admin"
  },
  {
    path: "/createquiz",
    name: "Create",
    icon: RateReviewIcon,
    component: CreateQuiz,
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
