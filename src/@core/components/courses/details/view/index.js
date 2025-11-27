// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** React Query
import { usecoursedatils } from "../../../../service/reactQuery/courseQuery";

// ** Reactstrap Components
import { Row, Col, Alert, Spinner, Card, CardBody, Badge, CardImg } from "reactstrap";

// ** Components
import Coursedetailstab from "../../details/view/Tabs";
import ModalBasic from "./ModalBasic";

const Coursedetails = () => {
    const [editModal, setEditModal] = useState(false);
  const [centeredModal, setCenteredModal] = useState(false);
  const [refetchChange, setRefetchChange] = useState(false);
  const [userSel, setUserSel] = useState([]);
  const { id } = useParams();
  console.log(id);
  const { data: course, isLoading, error } = usecoursedatils(id);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="danger">
        <h4 className="alert-heading">Error</h4>
        <div className="alert-body">{error.message || "خطا در دریافت اطلاعات دوره"}</div>
      </Alert>
    );
  }

  if (!course) {
    return (
      <Alert color="danger">
        <h4 className="alert-heading">Course Not Found</h4>
        <div className="alert-body">Course with id: {id} doesn't exist.</div>
      </Alert>
    );
  }

  // تبدیل ادیتور به متن
  let courseDescription = "";
  try {
    const parsed = JSON.parse(course.describe);
    courseDescription = parsed.blocks.map((b) => b.data.text).join("\n");
  } catch {
    courseDescription = course.describe || "";
  }

  // وضعیت دوره
  const statusColor = {
    started: "success",
    upcoming: "warning",
    ended: "danger",
  };
   const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const toggle = () => setEditModal(!editModal);

  // Format date
  const formatDate = (date) => new Date(date).toLocaleDateString("fa-IR");

  return (
    <div className="app-user-view">
      <Row>
        {/* ستون چپ */}
        <Col xl="4" lg="5" md="12">
          <Card className="mb-2 shadow-sm">
            <CardImg
              top
              src={
                course.imageAddress
                  ? course.imageAddress
                  : "https://via.placeholder.com/500x300?text=No+Image"
              }
              alt={course.title}
              style={{ height: "240px", objectFit: "cover" }}
            />
            <CardBody>
              <h3 className="mb-1">{course.title}</h3>
              <Badge color={statusColor[course.statusName] || "secondary"}>
                {course.statusName === "started"
                  ? "در حال برگزاری"
                  : course.statusName === "upcoming"
                  ? "در آینده"
                  : "پایان یافته"}
              </Badge>

              <hr />

              <p><strong>مدرس:</strong> {course.teacherName}</p>
              <p><strong>قیمت:</strong> {course.cost ? `${course.cost} تومان` : "رایگان"}</p>

              <p><strong>ظرفیت:</strong> {course.capacity}</p>
              <p><strong>رزرو شده:</strong> {course.reserveUserTotal}</p>

              <hr />

              <p><strong>شروع:</strong> {formatDate(course.startTime)}</p>
              <p><strong>پایان:</strong> {formatDate(course.endTime)}</p>

              <hr />

              <p><strong>توضیح کوتاه:</strong></p>
              <p className="text-muted">{course.miniDescribe}</p>
            </CardBody>
          </Card>

          {/* اطلاعات مدرس */}
          <Card>
            <CardBody>
              <h4><b>اطلاعات مدرس</b></h4>
              <p><strong>نام:</strong> {course.teacherName}</p>
              <p><strong>آیدی:</strong> {course.teacherId}</p>
              <p><strong>سطح دوره:</strong> {course.courseLvlId}</p>
            </CardBody>
          </Card>
        </Col>

        {/* ستون راست */}
        <Col xl="8" lg="7" md="12">
          <Card>
            <CardBody>
              <h3 className="mb-2">توضیحات دوره</h3>
              <p style={{ lineHeight: "28px" }}>{courseDescription}</p>
            </CardBody>
          </Card>

          <Coursedetailstab active={"1"} toggleTab={() => {}} />
        </Col>
      </Row>
            <ModalBasic
        centeredModal={centeredModal}
        setCenteredModal={setCenteredModal}
        // groupData={data}
        id={id}
        // changeReserve={handleChangeReserve}
        // setModalGr={setModalGr}
        toggleTab={toggleTab}
      />
    </div>
  );
};

export default Coursedetails;
