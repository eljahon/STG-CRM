import { useMutation } from "react-query";
import api from "./api";

export const Upload = () => {
  const token = window.localStorage.getItem("authToken");
  return useMutation({
    mutationFn: (data: FormData) =>
      api.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
  });
};

// import axios from "axios";

// export const UploadFile = async (data: any, query: any, onProgress: any) => {
//   const params = new URLSearchParams(query);
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_BACKEND_URL}/upload/custom_upload${
//       query ? "?" + params.toString() : ""
//     }`,
//     data,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       },
//       onUploadProgress: (progressEvent: any) => {
//         if (onProgress && progressEvent.total) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           onProgress(percentCompleted);
//         }
//       },
//     },

//   );
//   return response;
// };
// export const FileRemove = async (body: any) => {
//   const response = await axios.delete(
//     `${import.meta.env.VITE_API_STORE_URL}/remove`,
//     { data: body }
//   );
//   return response;
// };
