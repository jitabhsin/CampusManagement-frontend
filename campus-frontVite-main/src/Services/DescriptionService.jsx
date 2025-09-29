import axios from "axios";

const DES_URL = "http://localhost:9999/lost-found/description";

export const save = (description) =>{
    return axios.post(DES_URL, description);
}

export const findAll = () =>{
    return axios.get(DES_URL);
}

export const findById = (id) =>{
    return axios.get(DES_URL + "/" + id);
}

export const deleteById = (id) =>{
    return axios.delete(DES_URL + "/" + id);
}

export const update = (description)=>{
    return axios.put(DES_URL, description);
}