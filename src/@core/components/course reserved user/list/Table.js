import { Fragment } from "react";
import { Getreserveduser } from "../../../service/reactQuery/courseQuery";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap";
import { reservedUsersColumns } from "./columns";

const UsersList = ({ id }) => {
  const { data, isLoading } = Getreserveduser(id);

  const store = data || [];
  console.log(data,"adasda");

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
            columns={reservedUsersColumns}
            data={store}
            sortIcon={<ChevronDown />}
            pagination
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UsersList;
