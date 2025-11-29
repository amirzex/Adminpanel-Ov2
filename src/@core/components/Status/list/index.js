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
import { Edit, Target } from "react-feather";
import "@styles/react/apps/app-users.scss";
import DataTable from "react-data-table-component";
import { columns } from "./columns.js";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useStatusDetail } from "../../../service/reactQuery/StatusQuery.js";
import EditStatusModal from "./EditStatusModal.js";

const StatusList = () => {
  const { data } = useStatusDetail();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const handleEdit = (Status) => {
    setSelectedStatus(Status);
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

  const filteredData = (data || []).filter((Status) =>
    Object.values(Status)
      .join(" ")
      .toLowerCase()
      .includes((debouncedSearch || "").toLowerCase())
  );

  return (
    <Card>
      <CardHeader>مدیریت وضعیت</CardHeader>
      <CardBody>
        <Row className="mb-3">
          <Col lg="3" sm="6" className="mb-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <StatsHorizontal
                color="danger"
                statTitle="وضعیت"
                icon={<Target size={20} />}
                renderStats={
                  <h6 className="mb-0 fw-bold text-dark">{data?.length}</h6>
                }
              />
            </div>
          </Col>
          <Col lg="9" sm="12">
            <Input
              type="text"
              placeholder="جستجو وضعیت..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <DataTable
          title="فهرست وضعیت"
          columns={extendedColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />

        <EditStatusModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          selectedBuilding={selectedStatus}
        />
      </CardBody>
    </Card>
  );
};

export default StatusList;
