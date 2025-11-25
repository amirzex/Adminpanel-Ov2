export const columns = [
  {
    name: "ID ",
    selector: (row) => row.id.slice(0,2),
    sortable: true,
  },
  {
    name: " نام وضعیت",
    selector: (row) => row.statusName,
    sortable: true,
  },
  {
    name: "آدرس آیکون",
    selector: (row) => row.iconAddress,
    sortable: true,
  },
];
