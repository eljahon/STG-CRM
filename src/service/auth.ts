import api from "./api";
import {FormValues} from "../types";

export const AuthLogin = async (data:FormValues) => {
  const response = await api.post("/auth/login", data);
  return response?.data;
};
export const Loginout = async () => {
  const response = await api.post("/logout");
  return response;
};
