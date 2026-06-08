import api from "../api/api";
import axios from "axios";
const API_URL = "http://localhost:8000";

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

export const updateMonitoring = async (id, data) => {
    const response = await axios.patch(`${API_URL}/monitorings/${id}`, data);
    return response.data;
};