import api from "../api/api";

export const getZones = async () => {
    const response = await api.get("/zones");
    return response.data;
};

export const getZoneSensors = async (id) => {
    const response = await api.get(`/zones/${id}/sensors`);
    return response.data;
};