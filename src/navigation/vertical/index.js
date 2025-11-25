import {
  Mail,
  Home,
  Airplay,
  Circle,
  User,
  Users,
  UserPlus,
  Book,
  MessageSquare,
  Globe,
  Anchor,
  HelpCircle,
  Briefcase,
  Box,
} from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Globe size={20} />,
    navLink: "/home",
  },
  {
    id: "userList",
    title: "لیست کاربران",
    icon: <User size={20} />,
    navLink: "/users",
  },
  {
    id: "blogManagement",
    title: "مدیریت اخبار و مقالات",
    icon: <Book size={20} />,
    children: [
      {
        id: "blogList",
        title: "لیست اخبار و مقالات",
        icon: <Circle size={20} />,
        navLink: "/blogs",
      },
      {
        id: "createBlog",
        title: "افزودن اخبار و مقالات",
        icon: <Circle size={20} />,
        navLink: "/createBlog",
      },
      {
        id: "blogCategories",
        title: "مدیریت دسته بندی اخبار ",
        icon: <Circle size={20} />,
        navLink: "/blogCategories",
      },
    ],
  },
  {
    id: "commentsListPage",
    title: "مدیریت کامنت ها",
    icon: <MessageSquare size={20} />,
    navLink: "/comments",
  },
  {
    id: "Buildings",
    title: "ساختمان‌ها",
    icon: <Home size={20} />,
    children: [
      {
        id: "building's table",
        title: "جدول ساختمان‌ها",
        icon: <Circle size={12} />,
        navLink: "/building's",
      },
      {
        id: "create new building",
        title: " ایجاد ساختمان جدید",
        icon: <Circle size={12} />,
        navLink: "/create/Building",
      },
    ],
  },
  {
    id: "/AssistanceWorkTable",
    title: "دستیاران",
    icon: <HelpCircle size={20} />,
    children: [
      {
        id: "AssistanceWork List",
        title: " فهرست دستیاران",
        icon: <Circle size={12} />,
        navLink: "/AssistanceWorkTable",
      },
      {
        id: "create new building",
        title: " ایجاد دستیارها",
        icon: <Circle size={12} />,
        navLink: "/create/Assistance",
      },
    ],
  },
  {
    id: "/ClassRoom",
    title: "کلاس‌ها",
    icon: <Briefcase size={20} />,
    children: [
      {
        id: "ClassRoom List",
        title: " فهرست کلاس‌ها",
        icon: <Circle size={12} />,
        navLink: "/ClassRoom",
      },
      {
        id: "create new building",
        title: " ایجاد کلاس‌ها",
        icon: <Circle size={12} />,
        navLink: "/create/ClassRoom",
      },
    ],
  },
  {
    id: "/Department's",
    title: "دپارتمان ها",
    icon: <Box size={20} />,
    children: [
      {
        id: "/Department List",
        title: " فهرست دپارتمان ها",
        icon: <Circle size={12} />,
        navLink: "/Department's",
      },
      {
        id: "create new Department",
        title: " ایجاد دپارتمان ",
        icon: <Circle size={12} />,
        navLink: "/create/Department's",
      },
    ],
  },
];
