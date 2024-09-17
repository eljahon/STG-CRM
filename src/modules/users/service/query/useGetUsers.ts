import { useQuery } from "react-query";
import api from "../../../../service/api";
import { UsersGetDataTypes } from "../../types/user-types";

interface IFilter {
  limit: number;
  page: number;
  search: string
}

export const useGetUsers = (arg: IFilter) => {
  const { limit, page, search } = arg;

  return useQuery({
    queryKey: ["users", page, search],
    queryFn: () =>
      api
        .get<UsersGetDataTypes>("/api/v1/user", {
          params: { limit: limit || 5, page, search },
        })
        .then((res) => res.data),
  });
};
