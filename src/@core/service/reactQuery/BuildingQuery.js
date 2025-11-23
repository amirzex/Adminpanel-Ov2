import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBuilding,
  EditBuilding,
  GetAllBuilding,
} from "../api/building/GetBuilding";

export const useBuildingDetail = () => {
  return useQuery({
    queryKey: ["BuildingDetail"],
    queryFn: () => GetAllBuilding(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching user details:", error);
    },
  });
};

export const useBuildingEdit = () => {
  return useMutation({
    mutationFn: EditBuilding,
    onSuccess: (data) => {
      console.log("Building edited successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error editing building:",
        error.response?.data?.ErrorMessage || error.message
      );
    },
  });
};

export const useBuildingCreate = () => {
  return useMutation({
    mutationFn: createBuilding,
    onSuccess: (data) => {
      console.log("Building created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating building:", error.message);
    },
  });
};
