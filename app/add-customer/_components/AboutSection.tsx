"use client";

import { FormInput } from "@/components/formInput";
import { useCustomerForm } from "./context/CustomerContext";
import { HiMiniBuildingLibrary, HiUser } from "react-icons/hi2";
import cntl from "cntl";

const classes = {
    icon: cntl`
    absolute right-2 top-[14px] w-6 h-6
    `
}

export const AboutSection = () => {
    const {customer, addValueToCustomer} = useCustomerForm();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        addValueToCustomer(e.target.name, e.target.value);
    }
    return (
        <div className="flex flex-col w-full gap-4">
            <h2 className="text-[#192434] text-lg font-semibold">About</h2>
            <FormInput
                  value={customer.contactPersonName}
                  label={"Contact Person"}
                  name={"contactPersonName"}
                  onChange={handleChange}
                  type={"text"}
            >
                <HiUser 
                className={classes.icon} 
                fill={customer.contactPersonName ? "#006CFA" : "#1A3860"} 
                fillOpacity={customer.contactPersonName ? 0.76 : 0.10}
                />
            </FormInput>
            <FormInput
                  value={customer.companyName}
                  label={"Company Name"}
                  name={"companyName"}
                  onChange={handleChange}
                  type={"text"}
                >
                    <HiMiniBuildingLibrary 
                className={classes.icon} 
                fill={customer.companyName ? "#006CFA" : "#1A3860"} 
                fillOpacity={customer.companyName ? 0.76 : 0.10}
                />
                </FormInput>
            <FormInput
                  value={customer.companyName}
                  label={"Shop Type"}
                  name={"companyName"}
                  onChange={handleChange}
                  type={"text"}
                >
                      <HiUser 
                className={classes.icon} 
                fill={customer.contactPersonName ? "#006CFA" : "#1A3860"} 
                fillOpacity={customer.contactPersonName ? 0.76 : 0.10}
                />
                </FormInput>
        </div>
    )
}