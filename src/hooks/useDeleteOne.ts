import {useMutation} from "react-query";
import api from "../service/api.ts";
interface IDELETEONE<T> {
    url: string,
    params?: T
}

export const useDeleteOne = <T>(arg:IDELETEONE<T>) => {
    const {url, params} = arg
    return useMutation({
        mutationFn: (id: string) => api.delete(`/${url}/${id}`, {params:params}),
    });
};