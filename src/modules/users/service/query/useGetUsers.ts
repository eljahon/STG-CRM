import { useQuery } from "react-query";
import api from "../../../../service/api";
import { UsersGetDataTypes } from "../../types/user-types";

interface IFilter {
  limit: number;
  page: number;
  search: string;
  role_id: string;
}

export const useGetUsers = (arg: IFilter) => {
  const { limit, page, search, role_id } = arg;

  return useQuery({
    queryKey: ["users", page, search, role_id],
    queryFn: () =>
      api
        .get<UsersGetDataTypes>("/user", {
          params: { limit: limit || 5, page, search, role_id },
        })
        .then((res) => res.data),
  });
};
