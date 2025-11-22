import http from "../../interceptor/index";
import toast from "react-hot-toast";

const GetNewsList = async (params) => {
  try {
    const response = await http.get("/News/AdminNewsFilterList", {
      params: params,
    });
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

const GetNewsDetail = async (id) => {
  try {
    const response = await http.get(`/News/${id}`);
    return response;
  } catch {
    return [];
  }
};

const GetRepliesComments = async (id) => {
  try {
    const response = await http.get(`/News/GetRepliesComments?Id=${id}`);
    return response;
  } catch {
    return [];
  }
};

const GetNewsCategory = async () => {
  try {
    const response = await http.get(`/News/GetListNewsCategory`);
    return response;
  } catch {
    toast.error("مشکلی در دریافت دسته بندی های اخبار به وجود آمد!");
    return [];
  }
};

const UpdateNews = async (data, refetch) => {
  try {
    const dataObj = useFormData(data);
    const response = await http.put("/News/UpdateNews", dataObj);
    if (response.success) {
      toast.success("خبر با موفقیت ویرایش شد !");
      refetch()
    } else toast.error(res.message);
  } catch {
    toast.error("مشکلی در ویرایش خبر به وجود آمد !");
  }
};


export { GetNewsList,
        ActiveDeactiveNews, 
        GetNewsDetail, 
        GetRepliesComments,
        GetNewsCategory,
        UpdateNews };
