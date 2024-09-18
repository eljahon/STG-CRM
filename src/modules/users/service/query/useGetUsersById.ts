import { useQuery } from "react-query";
import api from "../../../../service/api";

export const useGetUsersById = (id: number | string | undefined) => {
  return (
    id !== "new" &&
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["usersById", id],
      queryFn: () => api.get(`/user/${id}`).then((res) => res.data),
    })
  );
};
