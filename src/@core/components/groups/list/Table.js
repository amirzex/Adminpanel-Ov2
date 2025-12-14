// ** React Imports
import React, { Fragment, useState } from "react";
// ** React Query
import { useAccessPost } from "../../../service/reactQuery/usersQuery";
import { useGetCourseGroup,AddcourseGroup } from "../../../service/reactQuery/group";
// ** Invoice List Sidebar
import Sidebar from "./Sidebar";
import UserEditModal from "../list/UserEditModal";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useDebounce } from "use-debounce";

// ** Table Header
const CustomHeader = ({ toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">ورودی ها</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center table-header-actions">
<Button className="add-new-user" color="primary" onClick={toggleSidebar}>
  اضافه کردن گروه
</Button>

          </div>
        </Col>
      </Row>
    </div>
  );
};

const GroupList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("Expire");
  const [sortType, setSortType] = useState("DESC");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const [debouncedSearch] = useDebounce(searchTerm, 500);


  const { data, isLoading, refetch } = useGetCourseGroup({
    pageNumber: currentPage,
    rowsOfPage: rowsPerPage,
    sortingCol: sortColumn,
    sortType: sortType,
    query: debouncedSearch,
  });
  console.log(data);

  const tableData = data?.courseGroupDtos;
  const totalCount = data?.totalCount;


  const { mutate: updateAccess, isLoading: isUpdating, isError } = useAccessPost();

  const handleSave = () => {
    if (!selectedRole || !selectedUser) return;

    const payload = {
      roleId: Number(selectedRole),
      userId: selectedUser.id,
    };

    updateAccess(payload, {
      onSuccess: () => {
        alert("Role updated successfully");
        refetch();
        setEditModalOpen(false);
      },
      onError: (err) => {
        console.error("Error updating role:", err.response?.data || err.message);
      },
    });
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePagination = (page) => setCurrentPage(page.selected + 1);

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(column.sortField);
    setSortType(sortDirection === "asc" ? "ASC" : "DESC");
    setCurrentPage(1);
  };

  const CustomPagination = () => {
    const pageCount = Math.ceil(totalCount / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={pageCount || 1}
        activeClassName="active"
        forcePage={currentPage - 1}
        onPageChange={handlePagination}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
      />
    );
  };

  return (
    <Fragment>
    
      <Card className="overflow-hidden">
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          paginationServer
          responsive
          columns={columns({
            onEdit: (user) => {
              setSelectedUser(user);
              setEditModalOpen(true);
            },
          })}
          onSort={handleSort}
          sortIcon={<ChevronDown />}
          data={tableData}
          paginationComponent={CustomPagination}
          subHeaderComponent={
            <CustomHeader
              searchTerm={searchTerm}
              rowsPerPage={rowsPerPage}
              handleFilter={handleFilter}
              handlePerPage={handlePerPage}
              toggleSidebar={toggleSidebar}
            />
          }
        />
      </Card>

     <Sidebar
  open={sidebarOpen}
  toggleSidebar={toggleSidebar}
  refetch={refetch}
/>


      <UserEditModal isOpen={editModalOpen} toggle={() => setEditModalOpen(false)}>
        {selectedUser && (
          <div>
            <h4>
              ویرایش کاربر: {selectedUser.fname} {selectedUser.lname}
            </h4>
            <Col md={6} xs={12}>
              <Label for="roleId">نقش کاربر</Label>
              <Input
                type="select"
                id="roleId"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">انتخاب کنید...</option>
                <option value={2}>Teacher</option>
                <option value={1}>Admin</option>
              </Input>
            </Col>
            <Button color="primary" onClick={handleSave} className="mt-2" disabled={isUpdating}>
              {isUpdating ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
            {isError && <p style={{ color: "red" }}>خطا در ذخیره نقش کاربر</p>}
          </div>
        )}
      </UserEditModal>
    </Fragment>
  );
};

export default GroupList;
