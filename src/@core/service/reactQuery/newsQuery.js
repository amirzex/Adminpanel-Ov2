import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {GetNewsList} from "../../service/api/Getnewslist/GetNews";


export const useNewsList = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["newsList"],
    queryFn: GetNewsList,
    select: (data) => ({
      data: data.news,
      total: data.totalCount,
    }),

    onSuccess: (data) => {
      console.log("Data fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });
};
