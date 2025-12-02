// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from "reactstrap";

// ** Icons Imports
import { User } from "react-feather";

// ** Components
import ListSearchbar from "../ListSearchbar";
import Coursecard from "../coursecard";

// ** React Query Hook
import { UsecourseList } from "../../../service/reactQuery/courseQuery";

const CoursesTabs = ({ active, toggleTab }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = UsecourseList({
    page: 1,
    rowsPerPage: 10,
    sort: "DESC",
    searchTerm: searchTerm,
  });

  const handleSearch = (value) => setSearchTerm(value);

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <ListSearchbar QueryFunction={handleSearch} width="w-100" />

          {isLoading && <p>در حال بارگذاری دوره‌ها...</p>}
          {isError && <p>خطا در بارگذاری دوره‌ها</p>}

          <Row className="match-height">
            {data?.data?.map((course) => (
              <Col md="4" xs="12" key={course.id}>
                <Coursecard course={course} />
              </Col>
            ))}
          </Row>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default CoursesTabs;
