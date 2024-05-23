"use client"

import { IProductDB, getProducts } from "@/apihandler/product.api";
import { useEffect, useState } from "react";
import {CustomerItem} from "./CustomerItem";
import { CustomerInterface } from "@/interfaces/Customer.interface";
import { useAuth } from "@/context/AuthContext";
import { getCustomers } from "@/apihandler/customer.api";

interface IProps {
    types: string[]
}
export const CustomerList = () => {
    let [customers, setCustomers] = useState<CustomerInterface[]>([]);
    const { user } = useAuth();
    useEffect(() => {
        async function fetchCustomers() { 
            const res = await getCustomers(user?.staffCode || "");
            console.log("customers", res);
            if (!res.error) {
                setCustomers(res.data || []);
            }
        }
        if (user?.staffCode) {
            fetchCustomers();
        }
    }, [user]);
    
    return (
        <div className='container mx-auto'>
            <h1 className='text-xl font-bold text-center mt-4 text-gray-400'>Customers</h1>
            <p className='text-left text-base text-gray-500 mb-10'>Total : {customers.length}</p>
            <div className='grid lg:grid-cols-3 xl:grid-cols-3 gap-[2rem] md:grid-cols-2 grid-cols-1'>
            {customers && customers.map((item, index) => {
                return <CustomerItem key={index} customer={item}/>
            })}
        </div>
        </div>
    )
}