import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApi } from "../api/getApi";

const newsList = async () => {
  const URL =
    "/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC&Query=&IsActive=true";
  const response = await getApi(URL);
  return response;
};

export const useNewsList = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["newsList"],
    queryFn: newsList,
    // staleTime: 1000 * 120,
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
