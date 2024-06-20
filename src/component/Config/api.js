import axios from "axios"

// export const API_URL = "http://localhost:8088"
export const API_URL = 'http://localhost/si'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",

    }
})