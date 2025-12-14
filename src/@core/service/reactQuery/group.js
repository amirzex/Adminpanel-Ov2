import { useQuery } from "@tanstack/react-query";
import http from "../interceptor"
import { data } from "jquery";


const fetchCourseGroup = async ({
  pageNumber = 1,
  rowsOfPage = 10,
  sortingCol = "DESC",
  sortType = "Expire",
  query = "",
}) => {
  const res = await http.get("/CourseGroup", {
    params: {
      PageNumber: pageNumber,
      RowsOfPage: rowsOfPage,
      SortingCol: sortingCol,
      SortType: sortType,
      Query: query,
    },
  });

  return res; 
};

export const useGetCourseGroup = (params) => {
  return useQuery({
    queryKey: ["course-group", params],
    queryFn: () => fetchCourseGroup(params),
    keepPreviousData: true, 
  });
};


export const AddcourseGroup = async(data)=>{ 
   try{
   const ress = await http.post("/CourseGroup",data,{
        headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }
  catch(err){
    console.log(err);
  }
}
export const EditcourseGroup = async (data) => {
  try {
    const formData = new FormData();
    formData.append("Id", data.Id);
    formData.append("GroupName", data.GroupName);
    formData.append("CourseId", data.CourseId);
    formData.append("GroupCapacity", data.GroupCapacity);

    const res = await http.put("/CourseGroup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


