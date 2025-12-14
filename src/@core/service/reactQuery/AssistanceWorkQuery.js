import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createAssistance,
  EditAssistance,
  GetAssistanceWork,
} from "../api/AssistanceWork/AssistanceWork";
import http from "../interceptor"

export const useAssistanceWork = () => {
  return useQuery({
    queryKey: ["AssistanceDetail"],
    queryFn: () => GetAssistanceWork(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching user details:", error);
    },
  });
};

export const useAssistanceCreate = () => {
  return useMutation({
    mutationFn: createAssistance,
    onSuccess: (data) => {
      console.log("Assistance created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating Assistance:", error.message);
    },
  });
};

export const useAssistanceEdit = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await http.put("/CourseAssistance", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res;
    },
    onSuccess: (data) => console.log("Assistance edited:", data),
    onError: (error) =>
      console.error("Error editing Assistance:", error.response?.data?.ErrorMessage || error.message),
  });
};