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
import { Edit, Sunset } from "react-feather";
import "@styles/react/apps/app-users.scss";
import DataTable from "react-data-table-component";
import { columns } from "./columns.js";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useTermDetail } from "../../../service/reactQuery/TermQuery.js";
import EditTermModal from "./EditTermModal.js";

const TermList = () => {
  const { data } = useTermDetail();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const handleEdit = (Dep) => {
    setSelectedTerm(Dep);
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
      <CardHeader>مدیریت term ها</CardHeader>
      <CardBody>
        <Row className="mb-3">
          <Col lg="3" sm="6" className="mb-2">
            <div className="bg-light p-3 rounded shadow-sm">
              <StatsHorizontal
                color="danger"
                statTitle="term ها"
                icon={<Sunset size={22} />}
                renderStats={<h3>{data?.length}</h3>}
              />
            </div>
          </Col>
          <Col lg="9" sm="12">
            <Input
              type="text"
              placeholder="جستجو term ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <DataTable
          title="فهرست term ها"
          columns={extendedColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />

        <EditTermModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          selectedBuilding={selectedTerm}
        />
      </CardBody>
    </Card>
  );
};

export default TermList;
