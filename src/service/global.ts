import { toast } from "react-toastify";
import api from "./api";
import qs from "qs";

export const GetAllData = async (url: string, query?: any) => {
  try {
    const params = query
      ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
      : "";
    const response = await api.get(`/${url}${params}`);
    return response?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const GetByIdData = async (url: string, id: any, query?: any) => {
  try {
    const params = query
      ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
      : "";
    const response = await api.get(`/${url}/${id}${params}`);
    return response?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const AddData = async (url: string, data: any) => {
  try {
    const response = await api.post(`/${url}`, data);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const UpdateData = async (url: string, data: any, id: any) => {
  try {
    const response = await api.put(`/${url}/${id}`, data);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};
export const UpdateDataOne = async (url: string, data: any) => {
  try {
    const response = await api.put(`/${url}`, data);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const DeleteDataId = async (url: string, id: string) => {
  try {
    const response = await api.delete(`/${url}/${id}`);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const GetMe = async () => {
  try {
    const res = await api.get("/users/me");
    return res;
  } catch (error: any) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  if (error?.response?.status === 401) {
    window.location.replace("/auth/login");
    window.localStorage.removeItem("authToken");
  } else {
    toast.error(error?.response?.data?.error?.message);
  }
};
