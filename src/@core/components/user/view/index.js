// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import { useUserDetail } from "../../../service/reactQuery/usersQuery";

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner, Card, CardBody, Badge } from "reactstrap";

// ** User View Components
import UserTabs from '../../user/view/Tabs'
// import PlanCard from './PlanCard'
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserView = () => {
  // ** Hooks
  const { id } = useParams();
  const { data: userData, isLoading, error } = useUserDetail(id);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="danger">
        <h4 className="alert-heading">Error</h4>
        <div className="alert-body">
          {error.message || "There was an error loading the user details"}
        </div>
      </Alert>
    );
  }

  if (!userData) {
    return (
      <Alert color="danger">
        <h4 className="alert-heading">User not found</h4>
        <div className="alert-body">
          User with id: {id} doesn't exist. Check list of all Users:{" "}
          <Link to="/users">Users List</Link>
        </div>
      </Alert>
    );
  }

  const userInfo = {
    id: userData.id,
    username: userData.userName,
    fullName: `${userData.fName} ${userData.lName}`,
    email: userData.gmail,
    contact: userData.phoneNumber,
    status: userData.active ? "active" : "inactive",
    role: userData.isTecher
      ? "Teacher"
      : userData.isStudent
      ? "Student"
      : "User",
    avatarColor: "light-primary",
    avatar:
      userData.currentPictureAddress !== "Not-set"
        ? userData.currentPictureAddress
        : null,
  };

  return (
    <div className="app-user-view ">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={userInfo} />
          <Card>
            <CardBody>
              <h4 className="mb-1"><b>اطلاعات تکمیلی</b></h4>
              <div className="mt-2">
                <p className="mb-50">
                  <strong><b>درباره:</b></strong>{" "}
                  {userData.userAbout || "No description available"}
                </p>
                <p className="mb-50">
                  <strong><b>کد ملی:</b></strong> {userData.nationalCode}
                </p>
                <p className="mb-50">
                  <strong><b>تاریخ تولد:</b></strong>{" "}
                  {new Date(userData.birthDay).toLocaleDateString()}
                </p>
                <p className="mb-50">
                  <strong><b>جنسیت:</b></strong> {userData.gender ? "Male" : "Female"}
                </p>
                <p className="mb-50">
                  <strong><b>آدرس:</b></strong>{" "}
                  {userData.homeAdderess || "Not provided"}
                </p>
                <p className="mb-50">
                  <strong><b>تکمیل پروفایل:</b></strong>{" "}
                  {userData.profileCompletionPercentage}%
                </p>
                {userData.linkdinProfile && (
                  <p className="mb-50">
                    <strong><b>لینکدین:</b></strong>{" "}
                    <a
                      href={userData.linkdinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Profile
                    </a>
                  </p>
                )}
                {userData.telegramLink && (
                  <p className="mb-50">
                    <strong><b>تلگرام:</b></strong>{" "}
                    <a
                      href={userData.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact
                    </a>
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs data={userData} UserId={id} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};
export default UserView;
