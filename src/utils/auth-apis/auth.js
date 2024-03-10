import axios from "axios";
import { resolve } from "../partials/resolve";

// API FOR LOGIN THROUGH OTP
export async function login(creds, role) {
    console.log(process.env.REACT_APP_CRAFTER_API_ENDPOINT);
    if (role == 0) {
        return await resolve(axios.post(`${process.env.REACT_APP_CRAFTER_API_ENDPOINT}/login`, creds, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
    else if (role == 1) {
        return await resolve(axios.post(`${process.env.REACT_APP_CONSUMER_API_ENDPOINT}/login`, creds, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
}

// API FOR VERIFYING OTP
// export async function verifyOtp(data) {
//     if (data.role == 0) {
//         return await resolve(axios.post(`${process.env.REACT_APP_CRAFTER_API_ENDPOINT}/otp-verify`, data, {
//             headers: {
//                 "content-type": "application/json",
//             }
//         }).then((res) => res.data));
//     }
//     else if (data.role == 1) {
//         return await resolve(axios.post(`${process.env.REACT_APP_CONSUMER_API_ENDPOINT}/otp-verify`, data, {
//             headers: {
//                 "content-type": "application/json",
//             }
//         }).then((res) => res.data));
//     }
// }


// API FOR LOGIN THROUGH OTP
export async function registerUser(creds, role) {
    console.log(process.env.REACT_APP_CRAFTER_API_ENDPOINT);
    if (role == 0) {
        return await resolve(axios.post(`${process.env.REACT_APP_CRAFTER_API_ENDPOINT}/register`, creds, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
    else if (role == 1) {
        return await resolve(axios.post(`${process.env.REACT_APP_CONSUMER_API_ENDPOINT}/register`, creds, {
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.data));
    }
}