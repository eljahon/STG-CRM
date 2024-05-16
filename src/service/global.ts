import { toast } from "react-toastify";
import api from "./api";

export const GetAllData = async (url: string, query?: any) => {
  try {
    const params = new URLSearchParams(query);

    const response = await api.get(
      `/${url}${query ? "?" + params.toString() : ""}`
    );
    return response?.data;
  } catch (error: any) {
    if (error?.response?.status == 401) {
      window.location.reload();
      window.localStorage.removeItem("authToken");
    } else {
      toast.error(error?.response?.data?.error?.message);
    }
  }
};

export const GetByIdData = async (url: string, id: any, query: any) => {
  try {
    const params = new URLSearchParams(query);
    const response = await api.get(
      `/${url}/${id}${query ? "?" + params.toString() : ""}`
    );
    return response?.data;
  } catch (error: any) {
    if (error?.response?.status == 401) {
      window.location.reload();
      window.localStorage.removeItem("authToken");
    } else {
      toast.error(error?.response?.data?.error?.message);
    }
  }
};

export const AddData = async (url: string, data: any) => {
  const response = await api.post(`/${url}`, data);
  return response;
};

export const UpdateData = async (url: string, data: any, id: any) => {
  const response = await api.put(`/${url}/${id}`, data);
  return response;
};
export const UpdateDataOne = async (url: string, data: any) => {
  const response = await api.put(`/${url}`, data);
  return response;
};

export const DeleteDataId = async (url: string, id: string) => {
  const response = await api.delete(`/${url}/${id}`);
  return response;
};

export const DeleteData = async (url: string, id: string) => {
  const response = await api.post(`/${url}/delete-multiple`, id);
  return response;
};

export const GetMe = async () => {
  const res = await api.get("/users/me");
  return res;
};
