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
import { Edit, Home } from "react-feather";
import "@styles/react/apps/app-users.scss";
import { useBuildingDetail } from "../../../service/reactQuery/BuildingQuery.js";
import DataTable from "react-data-table-component";
import { columns } from "./columns.js";
import { useState } from "react";
import EditBuildingModal from "./EditBuildingModal";
import { useDebounce } from "use-debounce";

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
      name: "عملیات",
      cell: (row) => (
        <Button color="primary" size="sm" onClick={() => handleEdit(row)}>
          <Edit size={16} className="me-1" /> ویرایش
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
    <Card>
      <CardHeader>مدیریت ساختمان‌ها</CardHeader>
      <CardBody>
        <Row className="mb-3">
          <Col lg="3" sm="6" className="mb-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <StatsHorizontal
                color="danger"
                statTitle="ساختمان‌ها"
                icon={<Home size={20} />}
                renderStats={
                  <h6 className="mb-0 fw-bold text-dark">{data?.length}</h6>
                }
              />
            </div>
          </Col>
          <Col lg="9" sm="12">
            <Input
              type="text"
              placeholder="جستجو ساختمان..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          responsive
        />

        <EditBuildingModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          selectedBuilding={selectedBuilding}
        />
      </CardBody>
    </Card>
  );
};

export default BuildingList;
