// @material-ui/icons
import Dashboard from "@material-ui/icons/FontDownload";
import LoginIcon from "@material-ui/icons/VerifiedUser";
import RegisterIcon from "@material-ui/icons/AccountBox";
import UserIcon from "@material-ui/icons/Face";
import TrainerIcon from "@material-ui/icons/Build";
import LogoutIcon from "@material-ui/icons/Backspace";



import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import DashboardUser from "views/Dashboard/DashboardUser.jsx";
import DashboardTrainer from "views/Dashboard/DashboardTrainer.jsx";

import Login from "views/Dashboard/LoginDashboard.jsx";
import Logout from "views/Dashboard/LogoutDashboard.jsx";

import Register from "views/Dashboard/RegisterProfile.jsx";


import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    rtlName: "لوحة القيادة",
    icon: RegisterIcon,
    component: Login,
    noAuth: true,
    admin: false,
    trainer: false,
    user: false,
    layout: "/makerSpaceLockoutSystem"
  },
  {
    path: "/register",
    name: "Register",
    rtlName: "لوحة القيادة",
    icon: LoginIcon,
    component: Register,
    noAuth: true,
    admin: false,
    trainer: false,
    user: false,
    layout: "/makerSpaceLockoutSystem"
  },
  {
    path: "/userCommands",
    name: "User Functions",
    rtlName: "لوحة القيادة",
    icon: UserIcon,
    noAuth: false,
    admin: false,
    trainer: true,
    user: true,
    component: DashboardUser,
    layout: "/makerSpaceLockoutSystem"
  },
  {
    path: "/trainerCommands",
    name: "Trainer Functions",
    rtlName: "لوحة القيادة",
    icon: TrainerIcon,
    component: DashboardTrainer,
    noAuth: false,
    admin: false,
    trainer: true,
    user: false,
    layout: "/makerSpaceLockoutSystem"
  },
  {
    path: "/adminCommands",
    name: "Admin Commands",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    noAuth: false,
    admin: true,
    trainer: false,
    user: false,
    layout: "/makerSpaceLockoutSystem"
  },
  {
    path: "/users",
    name: "User List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    noAuth: false,
    admin: true,
    trainer: false,
    user: false,
    layout: "/makerSpaceLockoutSystem"
  },
  {
    path: "/trainers",
    name: "Trainer List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    noAuth: false,
    admin: true,
    trainer: false,
    user: false,
    layout: "/makerSpaceLockoutSystem"
  }
  ,
  {
    path: "/logs",
    name: "Logs",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    noAuth: false,
    admin: true,
    trainer: false,
    user: false,
    layout: "/makerSpaceLockoutSystem"
  }
  ,
  {
    path: "/signOut",
    name: "Sign Out",
    rtlName: "الرموز",
    icon: LogoutIcon,
    component: Logout,
    noAuth: false,
    admin: true,
    trainer: true,
    user: true,
    layout: "/makerSpaceLockoutSystem"
  }
  /*,
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  /*{
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  },,
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  }*/
];

export default dashboardRoutes;
