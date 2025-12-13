export const columns = [
  {
    name: "عنوان کار ",
    selector: (row) => row.assistanceName,
    sortable: true,
  },
  {
    name: "شرح کار",
    selector: (row) => row.courseName,
    sortable: true,
  },
  {
    name: " شناسه کمک",
    selector: (row) => row.courseId,
    sortable: true,
  },

];
