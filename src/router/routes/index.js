// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import { elements } from "chart.js";
import BlogCategories from "../../pages/BlogCategories.js";
import Comments from "../../pages/Comments.js";
import GetBuilding from "../../pages/Building.js";
import CreateBuildingForm from "../../@core/components/Building/list/CreateBuilding.js";
import AssistanceWorkTable from "../../pages/AssistanceWorkTable.js";
import CreateWorkForm from "../../@core/components/AssistanceWork/list/CreateAssistance.js";
import ClassRoom from "../../pages/ClassRoom.js";
import CreateClassRoomForm from "../../@core/components/ClassRoom/list/CreateClassRoom.js";
import Department from "../../pages/Department.js";
import CreateDepartmentForm from "../../@core/components/Department/list/CreateDepartment.js";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";
const UserView = lazy(() => import("../../@core/components/user/view"));
const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const UserList = lazy(() =>
  import("../../@core/components/user/list/index.js")
);
const News = lazy(() => import("../../pages/News.js"));
const NewsDetails = lazy(() => import("../../pages/NewsDetails.js"));
const CreateNews = lazy(() => import("../../pages/CreateNews.js"));
const Wizard = lazy(() =>
  import("../../@core/components/Forms/wizard/WizardHorizontal.js")
);
// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    element: <UserList />,
    path: "/users",
  },
  {
    path: "/users/view/:id",
    element: <UserView />,
  },
  {
    element: <News />,
    path: "/blogs",
  },
  {
    element: <NewsDetails />,
    path: "/blogs/view/:id",
  },
  {
    element: <CreateNews />,
    path: "/createBlog",
  },
  {
    element: <BlogCategories />,
    path: "/blogCategories",
  },
  {
    element: <Comments />,
    path: "/comments",
  },
  {
    element: <GetBuilding />,
    path: "/building's",
  },
  {
    element: <CreateBuildingForm />,
    path: "/create/Building",
  },
  {
    element: <AssistanceWorkTable />,
    path: "/AssistanceWorkTable",
  },
  {
    element: <CreateWorkForm />,
    path: "/create/Assistance",
  },
  {
    element: <ClassRoom />,
    path: "/ClassRoom",
  },
  {
    element: <CreateClassRoomForm />,
    path: "/create/ClassRoom",
  },
  {
    element: <Department />,
    path: "/Department's",
  },
  {
    element: <CreateDepartmentForm />,
    path: "/create/Department's",
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
