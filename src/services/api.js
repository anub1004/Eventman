import axios from "axios";

const API_URL = "https://eventpollapi.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login"; // redirect to login on token expiration
    }
    return Promise.reject(err);
  }
);

// ================= AUTH APIs =================
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
};

// ================= EVENT APIs =================
export const eventAPI = {
  create: (data) => api.post("/events/add", data),
  getAll: () => api.get("/events/"),
  getById: (id) => api.get(`/events/${id}`),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  invite: (id, email) => api.post(`/events/${id}/invite`, { email }),
  respond: (id, response) => api.post(`/events/${id}/respond`, { response }),
};

// ================= POLL APIs =================
export const pollAPI = {
  vote: (pollId, optionIndex) => api.post(`/polls/${pollId}/vote`, { optionIndex }),
  getResults: (pollId) => api.get(`/polls/${pollId}/results`),
};

export default api;
