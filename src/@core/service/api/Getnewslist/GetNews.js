import useFormData from "../../../../utility/hooks/useFormData";
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
      refetch();
    } else toast.error(res.message);
  } catch {
    toast.error("مشکلی در ویرایش خبر به وجود آمد !");
  }
};

const GetNewsCategoryWithId = async (id) => {
  try {
    const response = await http.get(`/News/GetNewsCategory/${id}`);
    return response;
  } catch (error) {
    return null;
  }
};

const CreateNews = async (data) => {
  try {
    const dataObj = useFormData(data);
    const response = await http.post("/News/CreateNews", dataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.success) {
      toast.success(response.message);
    } else toast.error(response.message);
  } catch (error) {
    throw new Error(error.response.data.ErrorMessage);
  }
};

const CreateNewsCategory = async (data, refetch) => {
  try {
    const dataObj = useFormData(data);
    const response = await http.post("/News/CreateNewsCategory", dataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else toast.error(response.message);
    return response;
  } catch (error) {
    throw new Error(error.response.data.ErrorMessage);
  }
};

const UpdateNewsCategory = async (data, refetch) => {
  try {
    const dataObj = useFormData(data);
    const response = await http.put("/News/UpdateNewsCategory", dataObj);
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else toast.error(response.message);
  } catch {
    toast.error("مشکلی در ویرایش خبر به وجود آمد !");
  }
};

export {
  GetNewsList,
  ActiveDeactiveNews,
  GetNewsDetail,
  GetRepliesComments,
  GetNewsCategory,
  UpdateNews,
  GetNewsCategoryWithId,
  CreateNews,
  CreateNewsCategory,
  UpdateNewsCategory,
};
