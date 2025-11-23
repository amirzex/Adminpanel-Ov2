// ** React Imports
import React, { Fragment, useState, useEffect } from "react";
// ** React Query
import {
  useAccessPost,
  useAdminUserList,
} from "../../../service/reactQuery/usersQuery";
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

// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
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
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              اضافه کردن کاربر
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const { data: store } = useAdminUserList();
  const { data: Access } = useAccessPost();

  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortingCol, setSortingCol] = useState("id");
  const [sortType, setSortType] = useState("ASC");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { mutate: updateAccess, isLoading, isError } = useAccessPost();
  const [selectedRole, setSelectedRole] = React.useState("");

  const roles = [
    { id: 1, label: "Teacher" },
    { id: 2, label: "Admin" },
  ];

  const handleSave = () => {
    if (!selectedRole) return;

    const payload = {
      roleId: Number(selectedRole),
      userId: selectedUser.id,
    };

    updateAccess(payload, {
      onSuccess: () => {
        alert("Role updated successfully");
      },
      onError: (err) => {
        console.error(
          "Error updating role:",
          err.response?.data || err.message
        );
      },
    });
  };

  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب نقش",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "انتخاب طرح",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب وضعیت",
    number: 0,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Table data to render with filtering
  const dataToRender = () => {
    if (!store?.data) return [];

    let filteredData = [...store.data];

    // Apply role filter
    if (currentRole.value) {
      filteredData = filteredData.filter((user) =>
        user.userRoles?.includes(currentRole.value)
      );
    }

    // Apply status filter
    if (currentStatus.value) {
      filteredData = filteredData.filter(
        (user) => user.active.toString() === currentStatus.value
      );
    }

    if (currentPlan.value) {
      filteredData = filteredData.filter(
        (user) => user.profileCompletionPercentage === currentPlan.value
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (user) =>
          user.fname?.toLowerCase().includes(searchLower) ||
          user.lname?.toLowerCase().includes(searchLower) ||
          user.gmail?.toLowerCase().includes(searchLower) ||
          user.phoneNumber?.includes(searchTerm)
      );
    }

    return filteredData;
  };

  const paginatedData = dataToRender().slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const roleOptions = [
    { value: "", label: "انتخاب نقش" },
    { id: 3, label: "استاد" },
    { id: 2, label: "دانشجو" },
    { value: 1, label: "ادمین" },
  ];

  const planOptions = [
    { value: "", label: "انتخاب طرح" },
    { value: "0", label: "بدون تکمیل" },
    { value: "60", label: "تکمیل 60%" },
    { value: "70", label: "تکمیل 70%" },
    { value: "100", label: "تکمیل 100%" },
  ];

  const statusOptions = [
    { value: "", label: "انتخاب وضعیت", number: 0 },
    { value: "True", label: "فعال", number: 1 },
    { value: "False", label: "غیرفعال", number: 2 },
  ];

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(dataToRender().length / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    setSortingCol(column.sortField);
    setSortType(sortDirection === "asc" ? "ASC" : "DESC");
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">نقش</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  setCurrentPage(1);
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">طرح</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                  setCurrentPage(1);
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                  setCurrentPage(1);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns({
              onEdit: (user) => {
                setSelectedUser(user);
                setEditModalOpen(true);
              },
            })}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={paginatedData}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <UserEditModal
        isOpen={editModalOpen}
        toggle={() => setEditModalOpen(false)}
      >
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

            <Button
              color="primary"
              onClick={handleSave}
              className="mt-2"
              disabled={isLoading}
            >
              {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>

            {isError && <p style={{ color: "red" }}>خطا در ذخیره نقش کاربر</p>}
          </div>
        )}
      </UserEditModal>
    </Fragment>
  );
};

export default UsersList;
