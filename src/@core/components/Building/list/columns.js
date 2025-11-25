export const columns = [
  {
    name: "نام ساختمان",
    selector: (row) => row.buildingName,
    sortable: true,
  },
  {
    name: "طبقات",
    selector: (row) => row.floor,
    sortable: true,
  },
  {
    name: "عرض جغرافیایی",
    selector: (row) => row.latitude.slice(0,2)+ " /N",
    sortable: true,
  },
  {
    name: "طول جغرافیایی",
    selector: (row) => row.longitude.slice(0,2)+ " /S",
    sortable: true,
  },
];
