"use client";

import { FormInput } from "@/components/formInput";
import { useState } from "react";
import { useCustomerForm } from "./context/CustomerContext";
import cntl from "cntl";
import { HiMiniEnvelope, HiMiniPhone } from "react-icons/hi2";
import { FaLine } from "react-icons/fa";

const classes = {
    icon: cntl`
    absolute right-2 top-[14px] w-6 h-6
    `
}

export const ContactSection = () => {
    const {customer, addValueToCustomer} = useCustomerForm();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        addValueToCustomer(e.target.name, e.target.value);
    }
    return (
        <div className="flex flex-col w-full gap-4">
            <h2 className="text-[#192434] text-lg font-semibold">Contact</h2>
            <FormInput
                  value={customer.mobile}
                  label={"Phone Number"}
                  name={"mobile"}
                  onChange={handleChange}
                  type={"tel"}
                >
                     <HiMiniPhone 
                className={classes.icon} 
                fill={customer.mobile ? "#006CFA" : "#1A3860"} 
                fillOpacity={customer.mobile ? 0.76 : 0.10}
                />
                </FormInput>
            <FormInput
                  value={customer.email}
                  label={"Email"}
                  name={"email"}
                  onChange={handleChange}
                  type={"text"}
                >
                     <HiMiniEnvelope 
                className={classes.icon} 
                fill={customer.email ? "#006CFA" : "#1A3860"} 
                fillOpacity={customer.email ? 0.76 : 0.10}
                />
                </FormInput>
            <FormInput
                  value={customer.line}
                  label={"Line"}
                  name={"line"}
                  onChange={handleChange}
                  type={"text"}
                >
                     <FaLine 
                className={classes.icon} 
                fill={customer.line ? "#006CFA" : "#1A3860"} 
                fillOpacity={customer.line ? 0.76 : 0.10}
                />
                </FormInput>
        </div>
    )
}