import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Getcourseuserlist,
  getcousrid,
  Getuserdetail,
  Sendloginrequest,
} from "../api/Getuserlist/Adminuserlist.js";

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginInfo) => Sendloginrequest(loginInfo),
    onSuccess: (data) => {

      queryClient.invalidateQueries(["userList"]);
      queryClient.invalidateQueries(["courses"]);
    },
  });
};


export const useAdminUserList = (
  pageNumber = 1,
  rowsPerPage = 10,
  sortType = "DESC",
  sortingCol = "InsertDate"
) => {
  return useQuery({
    queryKey: ["adminUsers", pageNumber, rowsPerPage, sortType, sortingCol],
    queryFn: () => Getcourseuserlist(),
    staleTime: 1000 * 60 * 5, 
    select: (data) => ({
      data: data?.listUser,
      rol: data?.userRoles,
      total: data?.totalCount,
    }),
    enabled: true, 
  });
};

export const useUserDetail = (userId) => {
  return useQuery({
    queryKey: ["userDetail", userId],
    queryFn: () => Getuserdetail(userId),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching user details:", error);
    },
  });
};


export const useTopCourses = (count = 5) => {
  return useQuery({
    queryKey: ["courses", "top", count],
    queryFn: getcousrid,
    staleTime: 1000 * 60 * 15, 
    select: (data) => data?.data || [],
  });
};
