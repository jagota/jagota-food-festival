import { ICustomerToDB } from '@/interfaces/Customer.interface';
import axios from 'axios'
// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEVER_API_URL,
    withCredentials: true,
    timeout: 120000,
})

// API functions for different actions
const runtime = 'edge';
const addCustomer = (customerData: ICustomerToDB) => {
    return apiClient.post('/customers/add', customerData)
}

export { addCustomer, runtime }