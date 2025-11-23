import { Row, Col, Button, Input } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { Home, Edit } from "react-feather";
import "@styles/react/apps/app-users.scss";
import { useBuildingDetail } from "../../../service/reactQuery/BuildingQuery.js";
import DataTable from "react-data-table-component";
import { columns } from "./columns.js";
import { useState } from "react";
import EditBuildingModal from "./EditBuildingModal";
import { useDebounce } from "use-debounce";

// Custom styles for DataTable
const customStyles = {
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      fontSize: "16px",
    },
  },
};

const BuildingList = () => {
  const { data } = useBuildingDetail();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔑 Debounced search term (waits 500ms after typing stops)
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const handleEdit = (building) => {
    setSelectedBuilding(building);
    setModalOpen(true);
  };

  const extendedColumns = [
    ...columns,
    {
      name: "Actions",
      cell: (row) => (
        <Button
          color="primary"
          size="sm"
          onClick={() => handleEdit(row)}
          style={{ fontSize: "14px" }}
        >
          <Edit size={16} /> ویرایش
        </Button>
      ),
    },
  ];

  // 🔎 Filter data using debounced value
  const filteredData = (data || []).filter((building) =>
    Object.values(building)
      .join(" ")
      .toLowerCase()
      .includes((debouncedSearch || "").toLowerCase())
  );

  return (
    <div className="app-user-list" style={{ fontSize: "16px" }}>
      <Row className="mb-2">
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Buildings"
            icon={<Home size={22} />}
            renderStats={
              <h3 className="fw-bolder mb-75" style={{ fontSize: "20px" }}>
                {data?.length}
              </h3>
            }
          />
        </Col>
        <Col lg="12" sm="12">
          {/* Search input */}
          <Input
            type="text"
            placeholder="جستجو ساختمان..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: "16px", padding: "10px" }}
          />
        </Col>
      </Row>

      <DataTable
        title="فهرست ساختمان‌ها"
        columns={extendedColumns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles} // 🔑 apply larger font styles
      />

      <EditBuildingModal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        selectedBuilding={selectedBuilding}
      />
    </div>
  );
};

export default BuildingList;
