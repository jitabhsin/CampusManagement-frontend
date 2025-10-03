import axios from "axios";

const BASE_URL = "http://localhost:9999/lost-found";

export const getAllItems = () => axios.get(`${BASE_URL}/item`);

// For new lost items (no change)
export const lostItemSubmission = (lostItem) => axios.post(`${BASE_URL}/item`, lostItem);

// CHANGE: For new found items, use POST, not PUT
export const foundItemSubmission = (foundItem) => axios.post(`${BASE_URL}/item`, foundItem);

// CHANGE: For updating an existing item to "found"
export const markItemAsFound = (itemId, foundDate) =>
  axios.put(`${BASE_URL}/item/mark-found`, { itemId, foundDate });

export const getItemById = (id) => axios.get(`${BASE_URL}/item/${id}`);

export const deleteItemById = (id) => axios.delete(`${BASE_URL}/item/${id}`);

export const itemIdGenerator = () => axios.get(`${BASE_URL}/id-gen`);

export const notFoundItemList = () => axios.get(`${BASE_URL}/not-found`);

export const foundItemList = () => axios.get(`${BASE_URL}/found`);

export const lostItemListByUser = () => axios.get(`${BASE_URL}/lost`);

export const foundItemListByUser = () => axios.get(`${BASE_URL}/lostfound`);