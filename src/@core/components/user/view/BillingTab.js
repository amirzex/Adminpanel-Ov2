import "cleave.js/dist/addons/cleave-phone.us";
import DataTable from "react-data-table-component";
import { columns } from "../TabsColumns/ReserveColumns";

const BillingPlanTab = ({ Data }) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={Data?.courses || []}
        pagination
        highlightOnHover
        striped
        dense
      />
    </div>
  );
};

export default BillingPlanTab;
