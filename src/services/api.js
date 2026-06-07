import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Interceptor to automatically add JWT token to authorized requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const projectAPI = {
  // Get projects (paginated if page is specified, or all projects)
  getAll: (page, limit = 4) => {
    const url = page ? `/projects?page=${page}&limit=${limit}` : "/projects";
    return API.get(url);
  },
  
  // Get a single project
  getOne: (id) => API.get(`/projects/${id}`),

  // Create project (formData contains multipart image file)
  create: (formData) =>
    API.post("/projects", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Update project (formData contains optional multipart image file)
  update: (id, formData) =>
    API.put(`/projects/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Delete project
  delete: (id) => API.delete(`/projects/${id}`),
};

export const adminAPI = {
  // Verify access code and obtain JWT token
  unlock: (accessCode) => API.post("/admin/unlock", { accessCode }),
};

export default API;
