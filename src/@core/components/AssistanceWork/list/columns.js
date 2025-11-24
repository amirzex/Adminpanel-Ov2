export const columns = [
  {
    name: "عنوان کار ",
    selector: (row) => row.worktitle,
    sortable: true,
  },
  {
    name: "شرح کار",
    selector: (row) => row.workDescribe,
    sortable: true,
  },
  {
    name: " شناسه کمک",
    selector: (row) => row.assistanceId,
    sortable: true,
  },
  {
    name: " تاریخ کار",
    selector: (row) => row.workDate,
    sortable: true,
  },
];
