import { Fragment, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Button } from "reactstrap";
import { User } from "react-feather";

import ListSearchbar from "../ListSearchbar";
import Coursecard from "../coursecard";

import { UsecourseList } from "../../../service/reactQuery/courseQuery";

const CoursesTabs = ({ active, toggleTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  const { data, isLoading, isError } = UsecourseList({
    page,
    rowsPerPage,
    sort: "DESC",
    searchTerm,
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const totalCount = "";
  const totalPages = 10;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <Button
                color="primary"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                قبلی
              </Button>

              {pageNumbers.map((num) => (
                <Button
                  key={num}
                  color={page === num ? "secondary" : "primary"}
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </Button>
              ))}

              <Button
                color="primary"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                بعدی
              </Button>
            </div>
          )}
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default CoursesTabs;
