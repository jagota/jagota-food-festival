"use client"

import { IProductDB, getProducts } from "@/apihandler/product.api";
import { useEffect, useState } from "react";
import {CustomerItem} from "./CustomerItem";
import { CustomerInterface } from "@/interfaces/Customer.interface";
import { useAuth } from "@/context/AuthContext";
import { getCustomers } from "@/apihandler/customer.api";

interface IProps {
    searchTerm?: string
}
export const CustomerList = ({ searchTerm }: IProps) => {
    let [customers, setCustomers] = useState<CustomerInterface[]>([]);
    let [showCustomer, setShowCustomers] = useState<CustomerInterface[]>([]);
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

    useEffect(() => {
        if (searchTerm) {
            let text = ''
          const filteredCustomer= customers.filter((customer) => {
            text = customer.contactPersonName + customer.companyName;
            return text.toLowerCase().includes(searchTerm.toLowerCase())
          });
          setShowCustomers(filteredCustomer);
        } else {
            setShowCustomers(customers);
        }
      }, [searchTerm, customers])
    
    return (
        <div className=''>
            <div className='flex flex-col gap-2'>
            {showCustomer && showCustomer.map((item, index) => {
                return <CustomerItem key={index} customer={item}/>
            })}
        </div>
        </div>
    )
}