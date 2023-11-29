import axios from "axios";
import { resolve } from "../partials/resolve";

// API FOR LOGIN THROUGH OTP
export async function login(creds,role) {
    if (role == 0) {
        return await resolve(axios.post(`${process.env.CRAFTER_API_ENDPOINT}/login`, creds, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
    else if (role == 1) {
        return await resolve(axios.post(`${process.env.CONSUMER_API_ENDPOINT}/login`, creds, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
}

// API FOR VERIFYING OTP
export async function verifyOtp(data) {
    if (data.role == 0) {
        return await resolve(axios.post(`${process.env.CRAFTER_API_ENDPOINT}/otp-verify`, data, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
    else if (data.role == 1) {
        return await resolve(axios.post(`${process.env.CONSUMER_API_ENDPOINT}/otp-verify`, data, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
}