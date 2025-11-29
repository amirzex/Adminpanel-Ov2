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
import { Edit, Terminal } from "react-feather";
import "@styles/react/apps/app-users.scss";
import DataTable from "react-data-table-component";
import { columns } from "./columns.js";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useTechnologyDetail } from "../../../service/reactQuery/TechnologyQuery.js";
import EditTechnologyModal from "./EditTechnologyModal.js";

const TechnologyList = () => {
  const { data } = useTechnologyDetail();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const handleEdit = (Dep) => {
    setSelectedTech(Dep);
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

  const filteredData = (data || []).filter((Room) =>
    Object.values(Room)
      .join(" ")
      .toLowerCase()
      .includes((debouncedSearch || "").toLowerCase())
  );

  return (
    <Card>
      <CardHeader>مدیریت فناوری ها</CardHeader>
      <CardBody>
        <Row className="mb-3">
          <Col lg="3" sm="6" className="mb-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <StatsHorizontal
                color="danger"
                statTitle="فناوری ها"
                icon={<Terminal size={20} />}
                renderStats={
                  <h6 className="mb-0 fw-bold text-dark">{data?.length}</h6>
                }
              />
            </div>
          </Col>
          <Col lg="9" sm="12">
            <Input
              type="text"
              placeholder="جستجو فناوری ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <DataTable
          title="فهرست فناوری ها"
          columns={extendedColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />

        <EditTechnologyModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          selectedBuilding={selectedTech}
        />
      </CardBody>
    </Card>
  );
};

export default TechnologyList;
