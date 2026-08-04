import api from "./api";

export const getBusinesses = async () => {
    const response = await api.get("/businesses");
    return response.data;
};

export const createBusiness = async (data) => {
    const response = await api.post("/businesses", data);
    return response.data;
};

export const updateBusiness = async (id, data) => {
    const response = await api.put(`/businesses/${id}`, data);
    return response.data;
};

export const deleteBusiness = async (id) => {
    const response = await api.delete(`/businesses/${id}`);
    return response.data;
};