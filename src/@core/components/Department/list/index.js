import {
  Row,
  Col,
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { Home, Edit, Briefcase, Bold, Box } from "react-feather";
import "@styles/react/apps/app-users.scss";
import DataTable from "react-data-table-component";
import { columns } from "./columns.js";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useDepartmentDetail } from "../../../service/reactQuery/DepartmentQuery.js";
import EditDepModal from "../list/EditDepModal.js";

const customStyles = {
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      backgroundColor: "#f8f9fa",
      color: "#343a40",
      borderBottom: "2px solid #dee2e6",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      padding: "12px",
    },
  },
  rows: {
    style: {
      fontSize: "16px",
      "&:hover": {
        backgroundColor: "#f1f3f5",
        cursor: "pointer",
      },
    },
  },
};

const DepartmentList = () => {
  const { data } = useDepartmentDetail();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDep, setSelectedDep] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const handleEdit = (Dep) => {
    setSelectedDep(Dep);
    setModalOpen(true);
  };

  const extendedColumns = [
    ...columns,
    {
      name: "عملیات",
      cell: (row) => (
        <Button
          color="primary"
          size="sm"
          onClick={() => handleEdit(row)}
          className="rounded-pill px-3 py-1 fw-bold "
        >
          <Edit size={16} className="me-1" /> ویرایش
        </Button>
      ),
    },
  ];

  // 🔎 Filter data using debounced value
  const filteredData = (data || []).filter((Room) =>
    Object.values(Room)
      .join(" ")
      .toLowerCase()
      .includes((debouncedSearch || "").toLowerCase())
  );

  return (
    <Card className="shadow-lg border-0 rounded-3">
      <CardHeader className="bg-primary text-white text-center fw-bold fs-5">
        مدیریت دپارتمان ها
      </CardHeader>
      <CardBody>
        <Row className="mb-3 align-items-center">
          <Col lg="3" sm="6" className="mb-2">
            <StatsHorizontal
              color="danger"
              statTitle="دپارتمان ها"
              icon={<Box size={22} />}
              renderStats={
                <h3
                  className="fw-bolder mb-0 text-dark"
                  style={{ fontSize: "20px" }}
                >
                  {data?.length}
                </h3>
              }
            />
          </Col>
          <Col lg="9" sm="12">
            {/* Search input */}
            <Input
              type="text"
              placeholder="🔍 جستجو دپارتمان ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-pill px-3 py-2"
              style={{ fontSize: "16px" }}
            />
          </Col>
        </Row>

        <DataTable
          title="📋 فهرست دپارتمان ها"
          columns={extendedColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
        />

        <EditDepModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          selectedBuilding={selectedDep}
        />
      </CardBody>
    </Card>
  );
};

export default DepartmentList;
