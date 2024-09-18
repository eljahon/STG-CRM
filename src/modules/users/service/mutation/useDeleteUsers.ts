import { useMutation } from "react-query";
import api from "../../../../service/api";

export const useDeleteUsers = () => {
  return useMutation({
    mutationFn: (id: string) => api.delete(`/user/${id}`),
  });
};