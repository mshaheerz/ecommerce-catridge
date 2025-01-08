import axios from "axios";

const createAxios = (contentType) => {
  const instance = axios.create({
    baseURL: '/api',
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
    },
  });

  // Request Interceptor: Dynamically attach token
//   instance.interceptors.request.use(
//     (config) => {
//       const storedUser = localStorage.getItem("pro_admin_auth");
//       const token = storedUser ? JSON.parse(storedUser).token : null;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Response Interceptor: Handle errors globally
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem("pro_admin_auth");
//       }
//       return Promise.reject(error);
//     }
//   );

  return instance;
};

export const http = createAxios("application/json");
export const httpForm = createAxios("multipart/form-data");

const { get, post, put, delete: destroy, patch } = http;
const {
  post: postForm,
  put: putForm,
  delete: destroyForm,
  patch: patchForm,
} = httpForm;

export {
  get,
  post,
  put,
  destroy,
  postForm,
  putForm,
  destroyForm,
  patchForm,
  patch,
};
