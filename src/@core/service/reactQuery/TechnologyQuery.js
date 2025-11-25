import { useMutation, useQuery } from "@tanstack/react-query";

import { createTechnology, EditTechnology, GetAllTechnology } from "../api/Technology/GetTechnology";

export const useTechnologyDetail = () => {
  return useQuery({
    queryKey: ["TechnologyDetail"],
    queryFn: () => GetAllTechnology(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching Technology details:", error);
    },
  });
};

export const useTechnologyEdit = () => {
  return useMutation({
    mutationFn: EditTechnology,
    onSuccess: (data) => {
      console.log("Technology edited successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error editing Technology:",
        error.response?.data?.ErrorMessage || error.message
      );
    },
  });
};

export const useTechnologyCreate = () => {
  return useMutation({
    mutationFn: createTechnology,
    onSuccess: (data) => {
      console.log("Technology created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating Technology:", error.message);
    },
  });
};
