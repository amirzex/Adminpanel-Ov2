// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, FileText } from "react-feather";

// ** User Components
// import InvoiceList from "./InvoiceList.js";
import SecurityTab from "./SecurityTab";
import Connections from "./Connections";
import BillingPlanTab from "./BillingTab";
import Notifications from "./Notifications";
import UserComment from "./UserComment";

const UserTabs = ({ active, toggleTab,UserId ,data}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <FileText className="font-medium-3 me-50" />
            <span className="fw-bold">Comment</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">Course Reserve</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">Courses</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
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
        </NavItem> */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserComment UserId={UserId} />
        </TabPane>
        <TabPane tabId="2">
          <SecurityTab Data={data} />
        </TabPane>
        <TabPane tabId="3">
          <BillingPlanTab />
        </TabPane>
        <TabPane tabId="4">
          <Notifications />
        </TabPane>
        <TabPane tabId="5">
          <Connections />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
