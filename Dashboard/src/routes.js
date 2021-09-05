// core components
import Dashboard from "views/admin/Dashboard.js";
import Login from "views/auth/Login.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
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
import Person from "@material-ui/icons/Person";
import VpnKey from "@material-ui/icons/VpnKey";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RateReviewIcon from '@material-ui/icons/RateReview';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import QuizList from "views/student/QuizList";
import AttemptQuiz from "views/student/AttemptQuiz";
import Institute from "views/admin/Institute";
import ViewQuizScore from "views/admin/ViewQuizScore";

var routes = [

  {
    path: "/index",
    name: "Discussion",
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
    path: "/institute",
    name: "Schools",
    icon: AccountBalanceIcon,
    iconColor: "Primary",
    component: Institute,
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
    title: "Standard Materials",
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
    invisible: true,
    adminOnly: true,
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
    invisible: true,
    adminOnly: true,
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
    invisible: true,
    adminOnly: true,
  },
  {
    divider: true,
    invisible: true,
  },
  {
    title: "Additional Materials",
    invisible: true,
  },
  {
    path: "/additional_videos",
    name: "Videos",
    icon: VideoLibraryIcon,
    iconColor: "Primary",
    component: Videos,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/additional_slides",
    name: "Slides",
    icon: NoteAddIcon,
    iconColor: "Success",
    component: Slides,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/additional_articles",
    name: "Articles",
    icon: AttachFileIcon,
    iconColor: "Error",
    component: Articles,
    layout: "/admin",
    invisible: true,
  },
  {
    divider: true,
  },
  {
    title: "Quizes",
  },
  {
    path: "/quiz",
    name: "Create Quizes",
    icon: QuestionAnswerIcon,
    iconColor: "light",
    component: ViewQuiz,
    layout: "/admin",
    adminOnly: true,
  },
  {
    path: "/createquiz",
    name: "Create",
    icon: RateReviewIcon,
    component: CreateQuiz,
    layout: "/admin",
    invisible: true,
    adminOnly: true,
  },
  {
    path: "/quiz_list",
    name: "Quiz List",
    icon: RateReviewIcon,
    component: QuizList,
    layout: "/admin",
  },
  {
    path: "/view_score",
    name: "",
    icon: RateReviewIcon,
    component: ViewQuizScore,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/attempt_quiz",
    name: "Attempt Quiz",
    icon: RateReviewIcon,
    component: AttemptQuiz,
    layout: "/admin",
    invisible: true,
  },

];
export default routes;
