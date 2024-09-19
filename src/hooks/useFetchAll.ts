import { useQuery } from "react-query";
import api from "../service/api.ts";

interface IFilter<T> {
    key: string
    url: string,
    params?: T
}

export const useFetchAll=<T>(arg: IFilter<T>) => {
    const { key, url, params } = arg;

    return useQuery({
        queryKey: [key, params],
        queryFn: () =>
            api
                .get(`/${url}`, {
                    params: { ...params },
                })
                .then((res) => res.data),
    });
};
