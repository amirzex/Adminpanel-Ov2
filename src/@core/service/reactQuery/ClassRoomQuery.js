import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createClassRoom,
  EditClassRoom,
  GetAllClassRoom,
} from "../api/ClassRoom/GetClassRoom";

export const useClassRoomDetail = () => {
  return useQuery({
    queryKey: ["ClassRoomDetail"],
    queryFn: () => GetAllClassRoom(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching user details:", error);
    },
  });
};

export const useClassRoomEdit = () => {
  return useMutation({
    mutationFn: EditClassRoom,
    onSuccess: (data) => {
      console.log("ClassRoom edited successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error editing ClassRoom:",
        error.response?.data?.ErrorMessage || error.message
      );
    },
  });
};

export const useClassRoomCreate = () => {
  return useMutation({
    mutationFn: createClassRoom,
    onSuccess: (data) => {
      console.log("ClassRoom created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating ClassRoom:", error.message);
    },
  });
};
