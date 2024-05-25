"use client";

import { FormInput } from "@/components/formInput";
import { useCustomerForm } from "./context/CustomerContext";

export const LocationSection = () => {
    const {customer, addValueToCustomer} = useCustomerForm();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        addValueToCustomer(e.target.name, e.target.value);
    }
    return (
        <div className="flex flex-col w-full gap-4">
            <h2 className="text-[#192434] text-lg font-semibold">Location</h2>
            <FormInput
                  value={customer.province}
                  label={"Province"}
                  name={"province"}
                  onChange={handleChange}
                  type={"text"}
                />
            <FormInput
                  value={customer.district}
                  label={"District"}
                  name={"district"}
                  onChange={handleChange}
                  type={"text"}
                />
        </div>
    )
}