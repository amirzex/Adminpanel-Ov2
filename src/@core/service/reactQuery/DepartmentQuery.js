import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createDepartment,
  EditDepartment,
  GetAllDepartment,
} from "../api/Department/GetDepartment";

export const useDepartmentDetail = () => {
  return useQuery({
    queryKey: ["DepartmentDetail"],
    queryFn: () => GetAllDepartment(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching Department details:", error);
    },
  });
};

export const useDepartmentEdit = () => {
  return useMutation({
    mutationFn: EditDepartment,
    onSuccess: (data) => {
      console.log("Department edited successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error editing Department:",
        error.response?.data?.ErrorMessage || error.message
      );
    },
  });
};

export const useDepartmentCreate = () => {
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: (data) => {
      console.log("Department created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating Department:", error.message);
    },
  });
};
