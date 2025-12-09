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
        <Button color="primary" size="sm" onClick={() => handleEdit(row)}>
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
    <Card>
      <CardHeader>مدیریت دستیاران</CardHeader>
      <CardBody>
        {/* <Row className="mb-3">
          <Col lg="3" sm="6" className="mb-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <StatsHorizontal
                color="danger"
                statTitle="دستیاران"
                icon={<HelpCircle size={20} />}
                renderStats={
                  <h6 className="mb-0 fw-bold text-dark">{data?.length}</h6>
                }
              />
            </div>

            <Input
              type="text"
              placeholder="جستجو دستیاران..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row> */}

        <DataTable
          title="فهرست دستیاران"
          columns={extendedColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
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
