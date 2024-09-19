import { useQuery } from "react-query";
import api from "../service/api.ts";
interface IFETCHONE <K>{
    params?: K,
    key: string,
    url: string,
    id: string
}
export const useFetchOne = <T, K>(arg:IFETCHONE<K>) => {
    const {id, url, key, params} = arg
    return (
        id !== "new" &&
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery({
            queryKey: [`${key}`, id, url, params],
            queryFn: () => api.get<T>(`/${url}/${id}`).then((res) => res.data),
        })
    );
};