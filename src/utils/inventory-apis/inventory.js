import axios from "axios";
import { resolve } from "../partials/resolve";
import TokenService from "../../services/token-service";
export async function getInventory() {
    return await resolve(axios.get(`${process.env.INVENTORY_API_ENDPOINT}/`, {
        headers: {
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res) => res.data));
}

export async function getItem(id) {
    return await resolve(axios.get(`${process.env.INVENTORY_API_ENDPOINT}/edit/${id}`, {
        headers: {
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res) => res.data));
}

export async function editItem(id, data) {
    return await resolve(axios.post(`${process.env.INVENTORY_API_ENDPOINT}/edit/${id}`, data, {
        headers: {
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res) => res.data));
}

export async function addItem(data) {
    return await resolve(axios.post(`${process.env.INVENTORY_API_ENDPOINT}/`, data, {
        headers: {
            "content-type": "multipart/form-data",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res) => res.data));
}