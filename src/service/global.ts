import api from "./api";

export const GetAllData = async (url:string, query:any) => {
  try {
    const params = new URLSearchParams(query);
    const response = await api.get(`/${url}?${params.toString()}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetByIdData = async (url:string, id:string) => {
  try {
    const response = await api.get(`/${url}/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddData = async (url:string, data:any) => {
    const response = await api.post(`/${url}`, data);
    return response;
 
};


export const UpdateData = async (url:string, data:any, id:any) => {
  const response = await api.put(`/${url}/${id}`, data);
  return response;
};

export const DeleteDataId = async (url:string, id:string) => {
    const response = await api.delete(`/${url}/${id}`,);
    return response;
 
};

export const DeleteData = async (url:string, id:string) => {
    const response = await api.post(`/${url}/delete-multiple`,id);
    return response;
};

export const GetMe = async () => {
  const res = await api.get('/user')
  return res
}