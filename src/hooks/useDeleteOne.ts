import {useMutation} from "react-query";
import api from "../service/api.ts";
interface IDELETEONE<T> {
    url: string,
    params?: T,
    subUrl?: string
}

export const useDeleteOne = <T>(arg:IDELETEONE<T>) => {
    const {url, params, subUrl} = arg
    return useMutation({
        mutationFn: (id: string) => api.delete(subUrl ? `/${url}/${id}/${subUrl}` : `/${url}/${id}`, {params:params}),
    });
};