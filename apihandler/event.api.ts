import { IEvent } from '@/interfaces/Event.interface';
import axios from 'axios'
// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEVER_API_URL,
    withCredentials: true,
    timeout: 120000,
})

interface IGetEventResponse {
    error: boolean;
    data?: IEvent[];
    message: string;
}

const getEvent = async (): Promise<IGetEventResponse> => {
    const res = await apiClient.get(`/events/get-event`)
    const { data } = res;
    console.log("data", data);
    if (data.success) {
        return {error: false, data: data.data, message: "success"};
    }
    return {error: true, message: data.message};
}

export { getEvent }