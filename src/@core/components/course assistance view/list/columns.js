export const columns = [
  {
    name: "عنوان کار ",
    selector: (row) => row.assistanceName,
    sortable: true,
  },
  {
    name: "دوره",
    selector: (row) => row.courseName,
    sortable: true,
  },
  {
    name: " شناسه کمک",
    selector: (row) => row.courseId,
    sortable: true,
  },

];
