import axios from "axios";
import { resolve } from "../partials/resolve";
import TokenService from "../../services/token-service";

export async function placeOrder(state){
    return await resolve(axios.post(`${process.env.REACT_APP_CONSUMER_API_ENDPOINT}/order`,{
        items:state
    },{
        headers:{
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res)=>res.data));
}

export async function getOrders(){
    return await resolve(axios.get(`${process.env.REACT_APP_CONSUMER_API_ENDPOINT}/order`,{
        headers:{
            "content-type": "application/json",
            "authtoken": TokenService.getAuthToken(),
        }
    }).then((res)=>res.data));
}