export const columns = [
  {
    name: " termName ",
    selector: (row) => row.termName,
    sortable: true,
  },

  {
    name: " تاریخ شروع",
    selector: (row) => row.startDate.slice(0,10),
    sortable: true,
  },
  {
    name: " تاریخ پایان",
    selector: (row) => row.endDate.slice(0,10),
    sortable: true,
  },
];
