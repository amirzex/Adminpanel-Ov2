import { Mail, Home, Airplay, Circle ,User } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "users",
    title: "لیست کاربران",
    icon: <User size={20} />,
    navLink: "/second-page",
    children: [
      {
        id: "list",
        title: "کاربران",
        icon: <Circle size={12} />,
        navLink: "/apps/user/list",
      },
      {
        id: "view",
        title: "مشخصات",
        icon: <Circle size={12} />,
        navLink: "/apps/user/view",
      },
    ],
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
