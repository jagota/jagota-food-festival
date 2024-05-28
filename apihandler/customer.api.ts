import { CustomerInterface, ICustomerToDB } from '@/interfaces/Customer.interface';
import axios, { AxiosError } from 'axios'
// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEVER_API_URL,
    timeout: 120000,
})

interface IGetCustomerResponse {
    error: boolean;
    data?: CustomerInterface[];
    message: string;
}

interface IGetOneCustomerResponse {
    error: boolean;
    data?: CustomerInterface;
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
    try {
        const res = await apiClient.post('/customers/add', customerData)
        const { data } = res;
        console.log("data", data);
        if (data.success) {
            return {error: false, data: data.customer, message: "success"};
        }
        return {error: true, message: data.message};
    } catch (error: any) {
        console.log("error", error);
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError;
            if (err.response) {

                const { data } = err.response;
                if ((data as any).message && typeof (data as any).message === "string") {
                    return { error: true, message: (data as any).message };
                }
            }
        }
        return {error: true, message: (error as any).message};
    }
}

const getCustomers = async (salesPerson: string): Promise<IGetCustomerResponse> => {
    const res = await apiClient.get(`/customers?salesPerson=${salesPerson}`)
    const { data } = res;
    console.log("data", data);
    if (data.success) {
        return {error: false, data: data.data, message: "success"};
    }
    return {error: true, message: data.message};
}

const getOneCustomer = async (customerId: string): Promise<IGetOneCustomerResponse> => {
    const res = await apiClient.get(`/customers/${customerId}`)
    const { data } = res;
    console.log("data", data);
    if (data.success) {
        return {error: false, data: data.data, message: "success"};
    }
    return {error: true, message: data.message};
}

export { addCustomer, getCustomers, getOneCustomer, runtime }