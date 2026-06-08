import api from "../api/api";

export const createMonitoring = async (monitoringData) => {
    const response = await api.post("/monitorings", monitoringData);
    return response.data;
};

export const getMonitorings = async () => {
    const response = await api.get("/monitorings");
    return response.data;
};

export const getSensorsByZone = async (zoneId) => {
    const response = await api.get(`/zones/${zoneId}/sensors`);
    return response.data;
};