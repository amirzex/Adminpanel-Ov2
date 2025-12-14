import { Link } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreVertical, FileText, Edit2, Trash2 } from "react-feather";

export const columns = (actions = {}) => [
  {
    name: "نام گروه",
    sortable: true,
    sortField: "groupName",
    minWidth: "200px",
    selector: (row) => row.groupName,
    cell: (row) => (
      <Link
        to={`/course-group/view/${row.groupId}`}
        className="fw-bold text-body"
      >
        {row.groupName}
      </Link>
    ),
  },

  {
    name: "دوره",
    sortable: true,
    sortField: "courseName",
    minWidth: "200px",
    selector: (row) => row.courseName,
  },

  {
    name: "مدرس",
    sortable: true,
    sortField: "teacherName",
    minWidth: "180px",
    selector: (row) => row.teacherName,
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-semibold">{row.teacherName}</span>
        <small className="text-muted">{row.teacher?.gmail}</small>
      </div>
    ),
  },

  {
    name: "ظرفیت گروه",
    sortable: true,
    sortField: "groupCapacity",
    minWidth: "120px",
    selector: (row) => row.groupCapacity,
    cell: (row) => (
      <Badge color="light-primary" pill>
        {row.groupCapacity} نفر
      </Badge>
    ),
  },

  {
    name: "ظرفیت دوره",
    sortable: true,
    sortField: "capacity",
    minWidth: "130px",
    selector: (row) => row.course?.capacity,
    cell: (row) => (
      <Badge color="light-info" pill>
        {row.course?.capacity}
      </Badge>
    ),
  },

  {
    name: "شروع دوره",
    sortable: true,
    sortField: "startTime",
    minWidth: "170px",
    selector: (row) => row.course?.startTime,
    cell: (row) =>
      row.course?.startTime
        ? new Date(row.course.startTime).toLocaleString("fa-IR")
        : "-",
  },

  {
    name: "پایان دوره",
    sortable: true,
    sortField: "endTime",
    minWidth: "170px",
    selector: (row) => row.course?.endTime,
    cell: (row) =>
      row.course?.endTime
        ? new Date(row.course.endTime).toLocaleString("fa-IR")
        : "-",
  },

  {
    name: "اقدامات",
    minWidth: "120px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem
              tag={Link}
              to={`/course-group/view/${row.groupId}`}
              className="w-100"
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>

            <DropdownItem
              tag="button"
              className="w-100"
              onClick={() => actions.onEdit?.(row)}
            >
              <Edit2 size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>

            <DropdownItem
              tag="button"
              className="w-100 text-danger"
              onClick={() => actions.onDelete?.(row)}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
