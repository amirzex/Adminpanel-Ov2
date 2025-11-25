import { useMutation, useQuery } from "@tanstack/react-query";

import { createStatus, EditStatus, GetAllStatus } from "../api/Status/GetStatus";

export const useStatusDetail = () => {
  return useQuery({
    queryKey: ["StatusDetail"],
    queryFn: () => GetAllStatus(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching Status details:", error);
    },
  });
};

export const useStatusEdit = () => {
  return useMutation({
    mutationFn: EditStatus,
    onSuccess: (data) => {
      console.log("Status edited successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error editing Status:",
        error.response?.data?.ErrorMessage || error.message
      );
    },
  });
};

export const useStatusCreate = () => {
  return useMutation({
    mutationFn: createStatus,
    onSuccess: (data) => {
      console.log("Status created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating Status:", error.message);
    },
  });
};
