// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import axios from "axios";
import { MoreVertical, Edit, FileText, Archive, Trash } from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useBuildingDetail } from "../../../service/reactQuery/BuildingQuery";

// ** Vars
const states = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];

const status = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Professional", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

export let data;

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: "ID",
    sortable: true,
    maxWidth: "100px",
    selector: (row) => row.id,
  },
  {
    name: "buildingName",
    sortable: true,
    minWidth: "225px",
    selector: (row) => row.buildingName,
  },
  {
    name: "floor",
    sortable: true,
    minWidth: "310px",
    selector: (row) => row.floor,
  },
  {
    name: "active",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.active,
  },
];
// ** Table ReOrder Column
export const reOrderColumns = [
  {
    name: "ID",
    sortable: true,
    maxWidth: "100px",
    selector: (row) => row.id,
  },
  {
    name: "buildingName",
    sortable: true,
    minWidth: "225px",
    selector: (row) => row.buildingName,
  },
  {
    name: "floor",
    sortable: true,
    minWidth: "310px",
    selector: (row) => row.floor,
  },
  {
    name: "active",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.active,
  },
];

// ** Expandable table component
const ExpandableTable = ({  }) => {
  const { data } = useBuildingDetail();
  console.log(data[0].buildingName)
  return (
    <div className="expandable-content p-2">
      <p>
        <span className="fw-bold">buildingName:</span> {data.buildingName}
      </p>
      <p>
        <span className="fw-bold">floor:</span> {data.floor}
      </p>
      <p className="m-0">
        <span className="fw-bold">active:</span> {data.active}
      </p>
    </div>
  );
};

// ** Table Common Column
export const columns = [
  {
    name: "buildingName",
    minWidth: "250px",
    sortable: (row) => row.buildingName,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row?.avatar === "" ? (
          <Avatar
            color={`light-${states[row?.status]}`}
            content={row.buildingName}
            initials
          />
        ) : (
          <Avatar img={row?.avatar} />
        )}
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.buildingName}
          </span>
          <small>{row.floor}</small>
        </div>
      </div>
    ),
  },
  {
    name: "floor",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.floor,
  },
  {
    name: "active",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.active,
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    },
  },
];

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: "buildingName",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.buildingName,
  },
  {
    name: "floor",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.floor,
  },
  {
    name: "active",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.active,
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    },
  },
];

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: "buildingName",
    minWidth: "225px",
    selector: (row) => row.buildingName,
  },
  {
    sortable: true,
    name: "floor",
    minWidth: "250px",
    selector: (row) => row.floor,
  },
  {
    sortable: true,
    name: "active",
    minWidth: "250px",
    selector: (row) => row.active,
  },
];

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: "buildingName",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.buildingName,
  },
  {
    name: "floor",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.floor,
  },
  {
    name: "active",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.active,
  },
];

export default ExpandableTable;
