import { Mail, Home, Airplay, Circle, User, Users, UserPlus } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "userList",
    title: "لیست کاربران",
    icon: <User size={20} />,
    navLink: "/users",
  },
  {
    id: "createuser",
    title: "ایحاد کاربر",
    icon: <UserPlus size={20} />,
    navLink: "/create/user",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
];
