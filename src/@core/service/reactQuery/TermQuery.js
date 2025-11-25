import { useMutation, useQuery } from "@tanstack/react-query";

import { createTerm, EditTerm, GetAllTerm } from "../api/Term/GetTerm";

export const useTermDetail = () => {
  return useQuery({
    queryKey: ["TermDetail"],
    queryFn: () => GetAllTerm(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching Term details:", error);
    },
  });
};

export const useTermEdit = () => {
  return useMutation({
    mutationFn: EditTerm,
    onSuccess: (data) => {
      console.log("Term edited successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error editing Term:",
        error.response?.data?.ErrorMessage || error.message
      );
    },
  });
};

export const useTermCreate = () => {
  return useMutation({
    mutationFn: createTerm,
    onSuccess: (data) => {
      console.log("Term created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating Term:", error.message);
    },
  });
};
