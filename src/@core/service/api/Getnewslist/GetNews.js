import http from "../../interceptor/index";
import toast from "react-hot-toast";

const GetNewsList = async (params) => {
  try {
    const response = await http.get(
      "/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=15&IsActive=true",
      {
        params: params,
      }
    );
    return response;
  } catch {
    return [];
  }
};

const ActiveDeactiveNews = async (data, refetch) => {
  console.log(data);
  try {
    const response = await http.put("/News/ActiveDeactiveNews", data);
    if (response) {
      toast.success("خبر ویرایش شد");
      refetch();
      return response;
    } else {
      toast.error("خبر ویرایش نشد");
    }
  } catch (error) {
    return [];
  }
};

export { GetNewsList, ActiveDeactiveNews };
