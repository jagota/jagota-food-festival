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
    const BodyFormData = new FormData();
    const bodyObj = {
        "P_COM": process.env.NEXT_PUBLIC_DEFAULT_P_COM as string,
        "P_USER": data.username,
        "P_PASSWORD": data.password,
    }
    Object.entries(bodyObj).forEach(([key, value]) => {
      BodyFormData.append(key, value);
    });
    return axios.request({
        url: `${process.env.NEXT_PUBLIC_JAGOTA_API_URL}/apip/WS_THAIFEX/GET_STAFF_INFO`,
    
        data: BodyFormData,
    
        method: 'post',
    
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    // return apiClient.post('/auth/login', data)
}


export { loginUser, runtime }
