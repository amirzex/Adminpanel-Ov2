// services/reactQuery/courseQuery.js
import { useQuery } from "@tanstack/react-query";
import { getApi,postApi,putApi } from "../api/getApi";


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
    const response = await putApi("/Course", courseData);
    return response;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};


