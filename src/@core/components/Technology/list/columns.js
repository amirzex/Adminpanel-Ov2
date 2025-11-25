export const columns = [
  {
    name: "آدرس آیکون",
    selector: (row) => (
      <img
        src={row.iconAddress}
        alt="icon"
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
      />
    ),
    sortable: false, 
  },
  {
    name: " شناسه ",
    selector: (row) => row.id,
    sortable: true,
  },

  {
    name: "نام فناوری",
    selector: (row) => row.techName,
    sortable: true,
  },
  {
    name: " توضیحات",
    selector: (row) => row.describe,
    sortable: true,
  },
];
