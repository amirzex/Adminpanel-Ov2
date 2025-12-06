export const columns = [
  {
    name: "نام دوره",
    selector: (row) => row.courseName,
    sortable: true,
  },
  {
    name: "نام دانشجو",
    selector: (row) => row.studentName.slice(0, 10),
    sortable: true,
  },
  {
    name: "تاریخ رزرو",
    selector: (row) => row.reserverDate.slice(0, 10),
    sortable: true,
  },
  {
    name: "وضعیت",
    cell: (row) => (
      <div
        style={{
          backgroundColor: row.accept ? "green" : "red",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        {row.accept ? "تأیید شده" : "تایید نشده"}
      </div>
    ),
    sortable: true,
  },
];
