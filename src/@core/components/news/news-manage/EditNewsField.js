const EditNewsFields = (detail) => {
  const fields = {
    Id: detail?.Id ?? "",
    Title: detail?.Title ?? "",
    MiniDescribe: detail?.MiniDescribe ?? "",
    GoogleTitle: detail?.GoogleTitle ?? "",
    GoogleDescribe: detail?.GoogleDescribe ?? "",
    NewsCatregoryId: detail?.NewsCatregoryId ?? "",
    Describe: detail?.Describe ?? "",
    Active: true,
    CurrentImageAddress: "",
    CurrentImageAddressTumb: "",
    Image: "",
    Keyword: detail?.Keyword ?? "",
  };


  return fields;
};

export default EditNewsFields;
