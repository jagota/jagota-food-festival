import axios from 'axios'
const runtime = 'edge';
// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEVER_API_URL,
    withCredentials: true,
    timeout: 120000,
})

// API functions for different actions
const loginUser = (data: { username: string; password: string }) => {
    return apiClient.post('/auth/login', data)
}


export { loginUser, runtime }
