import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (data) => API.post("/auth/login", data);
export const getBookings = () => API.get("/bookings");
export const createBooking = (data) => API.post("/bookings", data);
export const updateBooking = (id, data) => API.put(`/bookings/${id}`, data);
export const cancelBooking = (id) => API.delete(`/bookings/${id}`); // Assumes soft delete on cancel if naming is cancel

export default API;
