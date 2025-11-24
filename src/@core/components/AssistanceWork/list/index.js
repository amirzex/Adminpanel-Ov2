import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "./columns";
import { useAssistanceWork } from "../../../service/reactQuery/AssistanceWorkQuery";
import { useDebounce } from "use-debounce";
import {
  Button,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import StatsHorizontal from "../../widgets/stats/StatsHorizontal";
import { Edit, HelpCircle } from "react-feather";
import EditAssistanceModal from "./EditModal";

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

const GetAssistanceWork = () => {
  const { data } = useAssistanceWork();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssistance, setSelectedAssistance] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const handleEdit = (assistance) => {
    setSelectedAssistance(assistance); // store clicked row
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
          className="rounded-pill px-3 py-1 fw-bold"
        >
          <Edit size={16} className="me-1" /> ویرایش
        </Button>
      ),
    },
  ];

  const filteredData = (data || []).filter((assistance) =>
    Object.values(assistance)
      .join(" ")
      .toLowerCase()
      .includes((debouncedSearch || "").toLowerCase())
  );

  return (
    <Card className="shadow-lg border-0 rounded-3">
      <CardHeader className="bg-primary text-white text-center fw-bold fs-5">
        مدیریت دستیاران
      </CardHeader>
      <CardBody>
        <Row className="mb-3 align-items-center">
          <Col lg="3" sm="6" className="mb-2">
            <StatsHorizontal
              color="danger"
              statTitle="دستیاران"
              icon={<HelpCircle size={22} />}
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
            <Input
              type="text"
              placeholder="🔍 جستجو دستیاران..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-pill px-3 py-2"
              style={{ fontSize: "16px" }}
            />
          </Col>
        </Row>

        <DataTable
          title="📋 فهرست دستیاران"
          columns={extendedColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
        />

        {/* Pass selected row into modal */}
        <EditAssistanceModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          selectedAssistance={selectedAssistance}
        />
      </CardBody>
    </Card>
  );
};

export default GetAssistanceWork;
