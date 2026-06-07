import api from "../api/api";

export const createMonitoring = async (data) => {
    const response = await api.post("/monitorings", data);
    return response.data;
};

export const getMonitorings = async () => {
    const response = await api.get("/monitorings");
    return response.data;
};