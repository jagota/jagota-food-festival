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
        <div className=''>
            <div className='flex flex-col gap-2'>
            {customers && customers.map((item, index) => {
                return <CustomerItem key={index} customer={item}/>
            })}
        </div>
        </div>
    )
}