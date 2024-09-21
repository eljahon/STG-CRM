import { useQuery } from "react-query";
import api from "../service/api.ts";
interface IFETCHONE <K>{
    params?: K,
    key: string,
    url: string,
    id: string,
    subUrl?: string
}
export const useFetchOne = <T, K>(arg:IFETCHONE<K>) => {
    const {id, url, key, params, subUrl} = arg
    return (
        id !== "new" &&
        useQuery({
            queryKey: [`${key}`, id, url, params],
            queryFn: () => api.get<T>(subUrl ? `/${url}/${id}/${subUrl}` : `/${url}/${id}`).then((res) => res.data),
        })
    );
};