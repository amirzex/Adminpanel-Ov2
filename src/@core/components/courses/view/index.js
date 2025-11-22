// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import { useUserDetail } from "../../../service/reactQuery/usersQuery";

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner, Card, CardBody, Badge } from "reactstrap";

// ** User View Components
import CoursesTabs from '../view/Tabs'
// import PlanCard from './PlanCard'


// ** Styles
import "@styles/react/apps/app-users.scss";

const CourseView = () => {
  // ** Hooks
  // const { id } = useParams();
  // const { data: userData, isLoading, error } = useUserDetail(id);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{ minHeight: "400px" }}
  //     >
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Alert color="danger">
  //       <h4 className="alert-heading">Error</h4>
  //       <div className="alert-body">
  //         {error.message || "There was an error loading the user details"}
  //       </div>
  //     </Alert>
  //   );
  // }

  // if (!userData) {
  //   return (
  //     <Alert color="danger">
  //       <h4 className="alert-heading">User not found</h4>
  //       <div className="alert-body">
  //         User with id: {id} doesn't exist. Check list of all Users:{" "}
  //         <Link to="/users">Users List</Link>
  //       </div>
  //     </Alert>
  //   );
  // }

  // const userInfo = {
  //   id: userData.id,
  //   username: userData.userName,
  //   fullName: `${userData.fName} ${userData.lName}`,
  //   email: userData.gmail,
  //   contact: userData.phoneNumber,
  //   status: userData.active ? "active" : "inactive",
  //   role: userData.isTecher
  //     ? "Teacher"
  //     : userData.isStudent
  //     ? "Student"
  //     : "User",
  //   avatarColor: "light-primary",
  //   avatar:
  //     userData.currentPictureAddress !== "Not-set"
  //       ? userData.currentPictureAddress
  //       : null,
  // };

  return (
    <div className="app-user-view ">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          {/* <UserInfoCard selectedUser={userInfo} /> */}

        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CoursesTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};
export default CourseView;
