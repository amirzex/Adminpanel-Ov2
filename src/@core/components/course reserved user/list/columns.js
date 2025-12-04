import { Badge } from "reactstrap";

export const reservedUsersColumns = [
  {
    name: "دانشجو",
    minWidth: "280px",
    selector: (row) => `${row.user?.fName ?? ""} ${row.user?.lName ?? ""}`,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.user?.currentPictureAddress ? (
          <img
            src={row.user.currentPictureAddress}
            alt={`${row.user.fName} ${row.user.lName}`}
            width={32}
            height={32}
            className="rounded-circle me-1"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            className="rounded-circle bg-light-primary me-1 d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
          >
            {row.user?.fName?.[0] ?? "U"}
          </div>
        )}

        <div className="d-flex flex-column">
          <span className="fw-bold">
            {row.user?.fName} {row.user?.lName}
          </span>
          <small className="text-muted">
            {row.user?.gmail}
          </small>
        </div>
      </div>
    )
  },

  {
    name: "ایمیل",
    selector: (row) => row.user?.gmail,
    minWidth: "250px"
  },

  {
    name: "وضعیت ثبت‌نام",
    minWidth: "150px",
    selector: (row) => row.accept,
    cell: (row) => (
      <Badge
        color={row.accept ? "light-success" : "light-danger"}
        pill
      >
        {row.accept ? "تایید شده" : "در انتظار"}
      </Badge>
    )
  }
];
