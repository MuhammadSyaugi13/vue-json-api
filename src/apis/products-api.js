import api from './api'

const RESOURCE ="/products"

export const getProducts = () => api.get(RESOURCE);

export const showProduct = (id) => api.get(RESOURCE + "/" + id);

export const createProduct = (payload) => api.post(RESOURCE, payload);

export const updateProduct = (id, payload) =>
  api.put(RESOURCE + "/" + id, payload);

export const deleteProduct = (id) => api.delete(RESOURCE + "/" + id);