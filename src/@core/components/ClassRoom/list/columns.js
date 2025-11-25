export const columns = [
  {
    name: "نام کلاس ",
    selector: (row) => row.classRoomName,
    sortable: true,
  },
  {
    name: "ظرفیت",
    selector: (row) => row.capacity,
    sortable: true,
  },
  {
    name: " ساختمان",
    selector: (row) => row.buildingId,
    sortable: true,
  },
];
