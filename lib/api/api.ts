import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api"

console.log("baseURL", baseURL);


export const nextServer = axios.create({
    baseURL,
    withCredentials: true,
})
