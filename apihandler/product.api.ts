import axios from 'axios'
const runtime = 'edge';
// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEVER_API_URL,
    withCredentials: true,
    timeout: 120000,
})

interface IGetProductFromAPI {
    P_COM: string;
    P_USER: string;
    P_KEYWORD: string;
    P_PAGE: number;
}

export interface IGetProductApiHandler {
    keyword?: string;
    pageNumber?: number;
}

export interface IProductDB {
    PRODUCT_CODE: string;
    PRODUCT_NAME_E: string;
    PRODUCT_SHORT_CODE: string;
    PRODUCT_THUMBNAIL: string;
    SEQ: string;
}

interface IGetProductResponse {
    error: boolean;
    data?: IProductDB[];
    message: string;
}

// API functions for different actions
const getProducts = async (args: IGetProductApiHandler): Promise<IGetProductResponse> => {
    const BodyFormData = new FormData();
    const bodyObj: IGetProductFromAPI = {
        "P_COM": process.env.NEXT_PUBLIC_DEFAULT_P_COM as string,
        "P_USER": process.env.NEXT_PUBLIC_DEFAULT_P_USER as string,
        "P_KEYWORD": args.keyword || "salmon",
        "P_PAGE": args.pageNumber || 1,
    }
    Object.entries(bodyObj).forEach(([key, value]) => {
      BodyFormData.append(key, value);
    });
    const res = await axios.request({
        url: `${process.env.NEXT_PUBLIC_JAGOTA_API_URL}/apip/WS_THAIFEX/GET_PRODUCT`,
    
        data: BodyFormData,
    
        method: 'post',
    
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    const { data } = res;
    if (data.flag === 1 && Array.isArray(data.result)) {
        return {error: false, data: data.result, message: "success"};
    }
    return {error: true, data: data.result, message: data.message};
    // return apiClient.post('/auth/login', data)
}


export { getProducts, runtime }
