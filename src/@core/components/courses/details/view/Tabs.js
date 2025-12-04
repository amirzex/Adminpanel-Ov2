// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";
import CommentsListCourse from "../../../comments copy/list/CommentsList";

// ** User Components
// import InvoiceList from "./InvoiceList.js";
// import SecurityTab from "./SecurityTab";
// import Connections from "./Connections";
// import BillingPlanTab from "./BillingTab";
// import UserTimeline from "./UserTimeline";
// import Notifications from "./Notifications";
// import UserProjectsList from "./UserProjectsList";

const Coursedetailstab = ({ active, toggleTab ,id}) => {
  console.log(id);
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">Security</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">Billing & Plans</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">Notifications</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">Connections</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">

         <CommentsListCourse id={id} />

          {/* <InvoiceList /> */}
        </TabPane>
        <TabPane tabId="2">
          
          </TabPane>
        <TabPane tabId="3">

          </TabPane>
        <TabPane tabId="4">

          </TabPane>
        <TabPane tabId="5">

          </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default Coursedetailstab;
