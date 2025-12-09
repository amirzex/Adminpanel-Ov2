// services/reactQuery/courseQuery.js
import { useQuery } from "@tanstack/react-query";
import { getApi,postApi,putApi } from "../api/getApi";
import toast from "react-hot-toast";
import http from "../interceptor"
import useFormData from "../../../utility/hooks/useFormData";

export const UsecourseList = ({ page, rowsPerPage, sortColumn, sort, searchTerm }) => {
  const fetchCourses = async () => {
    const query = searchTerm ? `&Query=${encodeURIComponent(searchTerm)}` : "";
    const URL = `/Course/CourseList?PageNumber=${page}&RowsOfPage=${rowsPerPage}&SortingCol=${sort}&${query}`;
    const response = await getApi(URL);
    return response;
  };

  return useQuery({
    queryKey: ["courseList", page, rowsPerPage, sortColumn, sort, searchTerm],
    queryFn: fetchCourses,
    select: (data) => ({
      data: data.courseDtos,
      total: data.totalCount,
    }),
    onSuccess: (data) => console.log("Data fetched:", data),
    onError: (error) => console.error("Error fetching courses:", error),
  });
};

export const usecoursedatils = (id ) => {
  const fetchCourses = async () => {
    const response = await getApi(`/Course/${id}`);
    return response;
  };

  return useQuery({
    queryKey: ["courseList", id],
    queryFn: fetchCourses,
    onSuccess: (data) => {
      console.log(" Courses fetched:", data);
    },
    onError: (error) => {
      console.error(" Error fetching courses:", error);
    },
  });
};export const deactiveCourse = async (id) => {
  try {
    const response = await putApi(
      "/Course/ActiveAndDeactiveCourse",id
    );
    return response;
  } catch (error) {
    console.error("Error deactivating course:", error);
    throw error;
  }
};

export const updateCourse = async (courseData) => {
  try {
    const response = await putApi("/Course", courseData,{
        headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};
export const GetCreateCourse = async () => {
  try {
    const result = await http.get("/Course/GetCreate");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};


 export const GetTechnologies = async () => {
  try {
    const result = await http.get("/Home/GetTechnologies");
    return result;
  } catch (error) {
    console.log(error);
    //   return [];
  }
}; 
export const Getreserveduser = async ({id}) => {
  try {
    const ress = await http.get(`/CourseReserve/${id}`);
    return ress;
  } catch (error) {
    console.log(error);
    //   return [];
  }
};
export const CreateCourse = async (value) => {
  try {
    const formData = useFormData(value);
    const result = await toast.promise(http.post("/Course", formData), {
      pending: "درحال افزودن",
      success: "دوره با موفقیت اضافه شد",
      error: "دوره اضافه نشد لطفا دوباره تلاش کنید",
    });
    return result;
  } catch (error) {
    console.log(error);
    //   return [];
  }
};
export const CreateImageApi = async (data) => {
  console.log(data);
  try {
    const result = await toast.promise(
      axios.post("https://api.segmind.com/v1/sdxl1.0-txt2img", data, {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "SG_e223471534b9e8bd",
        },
      }),
      {
        loading: "درحال یافتن عکس",
        success: "عکس با موفقیت پیدا شد",
        error: "برای سرور مشکل به وجود امد لطفا بعدا تلاش کنید",
      }
    );
    const pictureBlob = new Blob([result.data], { type: "image/jpeg" });
    const pictureUrl = URL.createObjectURL(pictureBlob);
    return pictureUrl;
  } catch (error) {
    console.log(error);
  }
};
export const AddTechnologies = async (courseId, Techs) => {
  // console.log(courseId,Techs)
  if (courseId === "") toast.error("آیدی دوره وجود ندارد");
  if (Techs.length == 0) toast.error("تکنولوژی دوره را انتخاب کنید");
  try {
    const result = await toast.promise(
      http.post(`/Course/AddCourseTechnology?courseId=${courseId}`, Techs),
      {
        pending: "درحال ثبت...",
        success: "با موفقیت انجام شد",
        error: "لطفا دوباره تلاش کنید",
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};



