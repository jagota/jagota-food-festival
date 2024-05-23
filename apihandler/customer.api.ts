import { CustomerInterface, ICustomerToDB } from '@/interfaces/Customer.interface';
import axios from 'axios'
// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEVER_API_URL,
    withCredentials: true,
    timeout: 120000,
})

interface IGetCustomerResponse {
    error: boolean;
    data?: CustomerInterface[];
    message: string;
}

interface ICreateCustomerResponse {
    error: boolean;
    data?: CustomerInterface;
    message: string;
}

// API functions for different actions
const runtime = 'edge';
const addCustomer = async (customerData: ICustomerToDB): Promise<ICreateCustomerResponse> => {
    const res = await apiClient.post('/customers/add', customerData)
    const { data } = res;
    if (data.success) {
        return {error: false, data: data.customer, message: "success"};
    }
    return {error: true, message: data.message};
}

export { addCustomer, runtime }