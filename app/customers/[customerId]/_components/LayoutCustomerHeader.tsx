"use client";
import { useCustomerForm } from "@/app/add-customer/_components/context/CustomerContext";
import { useCustomerType } from "@/context/CustomerTypeContext";

export const LayoutCustomerHeader = () => {
    const { customer} = useCustomerForm();
    return (
        <div className="flex flex-col mt-5 mb-10">
            <h2 className="text-[28px] text-[#192434] font-semibold capitalize">{customer.customerType} Information</h2>
            <h4 className="leading-7 text-base text-[#192739]/94 font-normal">{`Let's Connect and Grow Together`}</h4>
        </div>
    )
}