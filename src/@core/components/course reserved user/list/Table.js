import { Fragment, useState } from "react";
import { useGetReservedUser } from "../../../service/reactQuery/courseQuery";
import DataTable from "react-data-table-component";
import { ChevronDown, Edit } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button
} from "reactstrap";
import { reservedUsersColumns } from "./columns";
import EditAssistanceModal from "./EditModal";

const UsersList = ({ id }) => {
  const { data, isLoading } = useGetReservedUser(id);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssistance, setSelectedAssistance] = useState(null);

  const handleEdit = (row) => {
    setSelectedAssistance(row); 
    setModalOpen(true);
  };

  const extendedColumns = [
    ...reservedUsersColumns,
    {
      name: "عملیات",
      cell: (row) => (
        <Button color="primary" size="sm" onClick={() => handleEdit(row)}>
          <Edit size={16} className="me-1" />
         تایید
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">دانشجویان ثبت‌نام شده</CardTitle>
        </CardHeader>
      </Card>

      <Card className="mt-2">
        <CardBody>
          <DataTable
            noHeader
            responsive
            progressPending={isLoading}
            columns={extendedColumns}
            data={data || []}
            sortIcon={<ChevronDown />}
            pagination
          />

          <EditAssistanceModal
            isOpen={modalOpen}
            toggle={() => setModalOpen(!modalOpen)}
            selectedAssistance={selectedAssistance}
            courseId={id}      
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UsersList;
