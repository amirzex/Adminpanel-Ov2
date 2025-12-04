// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

// ** Icons Imports
import { User } from "react-feather";

// ** Components
import ListSearchbar from "../ListSearchbar";
import Coursecard from "../coursecard";

// ** React Query Hook
import { UsecourseList } from "../../../service/reactQuery/courseQuery";

const CoursesTabs = ({ active, toggleTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); 
  const rowsPerPage = 20;

  const { data, isLoading, isError } = UsecourseList({
    page: page,
    rowsPerPage: rowsPerPage,
    sort: "DESC",
    searchTerm: searchTerm,
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1); 
  };


  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-2 justify-content-center">
              <PaginationItem disabled={page === 1}>
                <PaginationLink
                  previous
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem active={page === i + 1} key={i}>
                  <PaginationLink onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={page === totalPages}>
                <PaginationLink
                  next
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </Pagination>
          )}
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default CoursesTabs;
