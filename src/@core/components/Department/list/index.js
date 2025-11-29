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
import { Edit, Box } from "react-feather";
import "@styles/react/apps/app-users.scss";
import DataTable from "react-data-table-component";
import { columns } from "./columns.js";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useDepartmentDetail } from "../../../service/reactQuery/DepartmentQuery.js";
import EditDepModal from "../list/EditDepModal.js";

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
        <Button color="primary" size="sm" onClick={() => handleEdit(row)}>
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
    <Card>
      <CardHeader>مدیریت دپارتمان ها</CardHeader>
      <CardBody>
        <Row className="mb-3">
          <Col lg="3" sm="6" className="mb-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <StatsHorizontal
                color="danger"
                statTitle="دپارتمان ها"
                icon={<Box size={20} />}
                renderStats={
                  <h6 className="mb-0 fw-bold text-dark">{data?.length}</h6>
                }
              />
            </div>
          </Col>
          <Col lg="9" sm="12">
            <Input
              type="text"
              placeholder="جستجو دپارتمان ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <DataTable
          title="فهرست دپارتمان ها"
          columns={extendedColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
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
