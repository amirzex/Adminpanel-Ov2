// services/reactQuery/courseQuery.js
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api/getApi";

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
