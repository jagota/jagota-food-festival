import { IEvent } from '@/interfaces/Event.interface';
import axios from 'axios'
// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEVER_API_URL,
    timeout: 120000,
})

interface IGetAiVisionResponse {
    error: boolean;
    data?: any;
    message: string;
}

const getAiVision = async (imageUrl: string): Promise<IGetAiVisionResponse> => {
    const res = await apiClient.get(`/vision/get-details?imageUrl=${imageUrl}`)
    const { data } = res;
    if (data.success) {
        return {error: false, data: data.data, message: "success"};
    }
    return {error: true, message: data.message};
}

export { getAiVision }