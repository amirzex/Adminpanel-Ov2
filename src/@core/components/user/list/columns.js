// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser, deleteUser } from '../store'

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row?.pictureAddress?.length) {
    return (
      <Avatar
        className="me-1 overflow-hidden"
        img={row.pictureAddress}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || "light-primary"}
        content={row.fullName || "John Doe"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRoles = (row) => {
  const roleIcons = {
    Administrator: { class: "text-danger", icon: Slack },
    Teacher: { class: "text-warning", icon: Settings },
    Student: { class: "text-primary", icon: User },
    "Employee.Admin": { class: "text-success", icon: Database },
    "Employee.Writer": { class: "text-info", icon: Edit2 },
  };

  if (!row.userRoles)
    return <span className="text-muted">No roles assigned</span>;

  const roles = row.userRoles.split(", ");
  const primaryRole = roles[0]; // Show first role with icon
  const Icon = roleIcons[primaryRole]?.icon || User;

  return (
    <span
      className="text-truncate text-capitalize align-middle"
      title={row.userRoles}
    >
      <Icon
        size={18}
        className={`${roleIcons[primaryRole]?.class || ""} me-50`}
      />
      {primaryRole} {roles.length > 1 ? `+${roles.length - 1}` : ""}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = (actions = {}) => [
  {
    name: "کاربر",
    sortable: true,
    minWidth: "300px",
    sortField: "fname",
    selector: (row) => `${row.fname} ${row.lname}`,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/users/view/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{`${row.fname} ${row.lname}`}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.gmail}</small>
        </div>
      </div>
    ),
  },
  {
    name: "تلفن",
    minWidth: "150px",
    sortable: true,
    sortField: "phoneNumber",
    selector: (row) => row.phoneNumber,
  },
  {
    name: "نقش",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.userRoles,
    cell: (row) => renderRoles(row),
  },
  {
    name: "تکمیل",
    minWidth: "110px",
    sortable: true,
    sortField: "profileCompletionPercentage",
    selector: (row) => row.profileCompletionPercentage,
    cell: (row) => (
      <Badge
        color={
          row.profileCompletionPercentage === "100"
            ? "light-success"
            : "light-warning"
        }
        pill
      >
        {row.profileCompletionPercentage}%
      </Badge>
    ),
  },
  {
    name: "وضعیت",
    minWidth: "110px",
    sortable: true,
    sortField: "active",
    selector: (row) => row.active,
    cell: (row) => (
      <Badge
        color={row.active === "True" ? "light-success" : "light-secondary"}
        pill
      >
        {row.active === "True" ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    name: "تاریخ ثبت نام",
    minWidth: "180px",
    sortable: true,
    sortField: "insertDate",
    selector: (row) => row.insertDate,
    cell: (row) =>
      row.insertDate ? new Date(row.insertDate).toLocaleString("fa-IR") : "-",
  },
  {
    name: "اقدامات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/apps/user/view/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                if (actions.onEdit) actions.onEdit(row);
              }}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                // store.dispatch(deleteUser(row.id))
              }}
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
