// C:\Users\ASUS\Documents\Infosysproject2025\campus-frontVite-main\src\Services\ItemService.jsx
import axios from "axios";

// API Endpoints
const ITEM_URL = "http://localhost:9999/lost-found/item";
const ITEMID_URL = "http://localhost:9999/lost-found/id-gen";
const LOST_URL = "http://localhost:9999/lost-found/not-found";
const FOUND_URL = "http://localhost:9999/lost-found/found";

export const getAllItems = () => axios.get(ITEM_URL);
export const lostItemSubmission = (lostItem) => axios.post(ITEM_URL, lostItem);
export const foundItemSubmission = (foundItem) => axios.put(ITEM_URL, foundItem);
export const getItemById = (id) => axios.get(`${ITEM_URL}/${id}`);
export const deleteItemById = (id) => axios.delete(`${ITEM_URL}/${id}`);
export const itemIdGenerator = () => axios.get(ITEMID_URL);
// Renamed notFoundItemList to lostItemList to match usage in components
export const lostItemList = () => axios.get(LOST_URL);
export const foundItemList = () => axios.get(FOUND_URL);