export const columns = [
  {
    name: " termName ",
    selector: (row) => row.termName,
    sortable: true,
  },

  {
    name: " تاریخ شروع",
    selector: (row) => row.startDate,
    sortable: true,
  },
  {
    name: " تاریخ پایان",
    selector: (row) => row.endDate,
    sortable: true,
  },
];
