import { useQuery } from "react-query";
import api from "../../../../service/api";
import { UsersGetDataTypes } from "../../types/user-types";

interface IFilter {
  limit: number;
  page: number;
}

export const useGetUsers = (arg: IFilter) => {
  const { limit, page } = arg;

  return useQuery({
    queryKey: ["users", page],
    queryFn: () =>
      api
        .get<UsersGetDataTypes>("/api/v1/user", {
          params: { limit: limit || 5, page: page },
        })
        .then((res) => res.data),
  });
};
