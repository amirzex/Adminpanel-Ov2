// ** React Imports
import { Link } from "react-router-dom";
import { useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "reactstrap";

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

// ** Render Client Column
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

// ** Render Roles Column (show max 3, truncate rest)
const renderRoles = (row) => {
  const roleIcons = {
    Administrator: { class: "text-danger", icon: Slack },
    Teacher: { class: "text-warning", icon: Settings },
    Student: { class: "text-primary", icon: User },
    "Employee.Admin": { class: "text-success", icon: Database },
    "Employee.Writer": { class: "text-info", icon: Edit2 },
  };

  if (!row.userRoles) {
    return <span className="text-muted">No roles assigned</span>;
  }

  // ✅ Split by comma (adjust if backend uses another delimiter)
  const roles = row.userRoles.split(",").map((r) => r.trim());

  const [tooltipOpen, setTooltipOpen] = useState({});

  const toggle = (id) => {
    setTooltipOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleRoles = roles.slice(0, 3);
  const hiddenCount = roles.length - visibleRoles.length;

  return (
    <span className="d-flex align-items-center">
      {visibleRoles.map((role, i) => {
        const Icon = roleIcons[role]?.icon || User;
        const iconClass =
          roleIcons[role]?.class ||
          `text-${
            ["primary", "success", "danger", "warning", "info", "secondary"][
              i % 6
            ]
          }`;
        const id = `role-icon-${row.id}-${i}`; // ✅ unique per row + index

        return (
          <span key={id} id={id} className="me-50">
            <Icon size={18} className={iconClass} />
            <Tooltip
              isOpen={tooltipOpen[id] || false}
              target={id}
              toggle={() => toggle(id)}
            >
              {role}
            </Tooltip>
          </span>
        );
      })}
      {hiddenCount > 0 && (
        <span className="text-muted ms-1">+{hiddenCount} more</span>
      )}
    </span>
  );
};

// ** Status Colors
const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

// ** Table Columns
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
        color={row.active === true ? "light-success" : "light-secondary"}
        pill
      >
        {row.active === true ? "Active" : "Inactive"}
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
              to={`/users/view/${row.id}`}
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
