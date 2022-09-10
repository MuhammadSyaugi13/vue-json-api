import api from "./api";

const RESOURCE = "/categories";

export const getCategories = () => api.get(RESOURCE);