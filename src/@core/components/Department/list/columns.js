export const columns = [
  {
    name: " شناسه ",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "نام دپارتمان  ",
    selector: (row) => row.depName,
    sortable: true,
  },
  {
    name: "نام",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: " ساختمان",
    selector: (row) => row.buildingName,
    sortable: true,
  },
  {
    name: " طبقه",
    selector: (row) => row.building.floor,
    sortable: true,
  },
];
