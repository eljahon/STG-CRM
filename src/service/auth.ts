import api from "./api";

export const AuthLogin = async (data:any) => {
  const response = await api.post("/login", data);
  return response?.data;
};
export const Loginout = async () => {
  const response = await api.post("/logout");
  return response;
};
