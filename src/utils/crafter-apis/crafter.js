import axios from 'axios';
import {resolve} from '../partials/resolve';
import TokenService from "../../services/token-service";

export async function editCrafter(data){
    return await resolve(axios.post(`${process.env.CRAFTER_API_ENDPOINT}/edit`,data,{
        headers:{
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res)=>res.data));
}

export async function getCrafter(){
    return await resolve(axios.get(`${process.env.CRAFTER_API_ENDPOINT}/edit`,{
        headers:{
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res)=>res.data));
    
}

export async function getInventory(){
    return await resolve(axios.get(`${process.env.INVENTORY_API_ENDPOINT}/`,{
        headers:{
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res)=>res.data));
}


