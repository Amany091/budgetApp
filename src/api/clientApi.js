import axios from "axios";

export const clientApi = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
})
